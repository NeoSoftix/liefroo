const crypto = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const ContactMessage = require("../models/ContactMessage");

const router = express.Router();

// Admin API used by the app.liefro.de dashboard (Leads page) to list the
// contact form submissions saved in MongoDB, newest first.
// Every request must send the shared key from PACKAGES_API_KEY in `x-api-key`.
function requireApiKey(req, res, next) {
  const expected = process.env.PACKAGES_API_KEY || "";
  const given = String(req.get("x-api-key") || "");
  const ok =
    expected.length > 0 &&
    given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));

  if (!ok) return res.status(401).json({ success: false, message: "Unauthorized." });
  return next();
}

router.use(requireApiKey);

router.get("/", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database is not connected." });
  }

  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 500, 1), 2000);

  try {
    const docs = await ContactMessage.find().sort({ createdAt: -1 }).limit(limit).lean();
    const leads = docs.map((d) => ({
      id: String(d._id),
      name: d.name || "",
      email: d.email || "",
      phone: d.phone || "",
      subject: d.subject || "",
      service: d.service || "",
      message: d.message || "",
      mailSent: !!d.mailSent,
      createdAt: d.createdAt,
    }));
    const total = await ContactMessage.estimatedDocumentCount();
    return res.json({ success: true, total, leads });
  } catch (error) {
    console.error("Leads list error:", error);
    return res.status(500).json({ success: false, message: "Could not load leads." });
  }
});

module.exports = router;
