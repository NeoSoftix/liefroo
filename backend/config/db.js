const dns = require("dns");
const mongoose = require("mongoose");

const RETRY_MS = 30 * 1000;
const PUBLIC_DNS = ["1.1.1.1", "8.8.8.8"];

// mongodb+srv:// URIs need a DNS SRV lookup, which Node does with its own
// resolver (dns.resolve*, not the OS lookup). On some machines that resolver
// points at a dead server (e.g. 127.0.0.1 left behind by a VPN/DNS tool), so
// fall back to public DNS for those lookups when the system one refuses.
async function ensureSrvResolvable(uri) {
  // Regex rather than URL(): passwords with special characters break URL parsing
  const host = uri.match(/^mongodb\+srv:\/\/(?:.*@)?([^/?@]+)/)?.[1];
  if (!host) return;
  try {
    await dns.promises.resolveSrv(`_mongodb._tcp.${host}`);
  } catch (error) {
    if (!["ECONNREFUSED", "ETIMEOUT", "ESERVFAIL"].includes(error.code)) return;
    console.warn(`System DNS could not resolve ${host} (${error.code}), using public DNS for SRV lookups.`);
    dns.setServers(PUBLIC_DNS);
  }
}

// Fail saves right away while disconnected instead of queueing them, so a
// form still gets its mail out when the database is unreachable.
mongoose.set("bufferCommands", false);

// Connects to MongoDB and keeps retrying until the first connection succeeds;
// after that mongoose reconnects on its own.
function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set — form submissions will not be saved.");
    return;
  }

  ensureSrvResolvable(process.env.MONGODB_URI)
    .then(() => mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 }))
    .then((conn) => console.log(`MongoDB connected (${conn.connection.name})`))
    .catch((error) => {
      console.error(`MongoDB connection failed, retrying in ${RETRY_MS / 1000}s:`, error.message);
      setTimeout(connectDB, RETRY_MS);
    });
}

module.exports = connectDB;
