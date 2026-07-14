// Runs after `vite build`. Boots the built app on a local static server, visits
// every route with headless Chrome, and overwrites dist/<route>/index.html with
// the fully-rendered HTML — so <title>/OG/meta tags set by react-helmet-async
// are present in the raw HTML for crawlers and "View Source", not just after
// client-side JS runs.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// Keep in sync with the <Route> list in src/App.jsx.
// "/thank-you" is intentionally excluded — it only renders with in-memory
// navigation state and is already marked noIndex.
const routes = [
  "/",
  "/products",
  "/website-development",
  "/mobile-app-development",
  "/printer-integration",
  "/pos-system-development",
  "/technical-support",
  "/menu-management",
  "/google-business-seo",
  "/meta-ads",
  "/google-ads",
  "/online-ordering",
  "/google-analytics",
  "/reservation-system",
  "/qr-ordering",
  "/privacy-policy",
  "/terms-conditions",
];

async function run() {
  const server = await preview({ root, preview: { port: 4173, strictPort: false } });
  const { local } = server.resolvedUrls.local.length
    ? server.resolvedUrls
    : { local: [`https://liefro.com/${server.config.preview.port}/`] };
  const baseUrl = local[0].replace(/\/$/, "");

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (err) {
    console.warn(
      `[prerender] Skipping — could not launch headless Chrome (${err.message}). ` +
        `The build's plain index.html will be used for every route.`
    );
    await server.httpServer.close();
    return;
  }

  // dist/index.html is both the output file for "/" AND the file the preview
  // server's SPA fallback serves for any route whose own dist/<route>/index.html
  // doesn't exist yet. So "/" must be crawled and written LAST — otherwise every
  // route processed after it would load Home's already-baked tags as its
  // starting HTML and layer its own tags on top of them.
  const orderedRoutes = [...routes.filter((r) => r !== "/"), "/"];
  const failures = [];

  try {
    for (const route of orderedRoutes) {
      const page = await browser.newPage();
      try {
        await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for react-helmet-async's effect to flush the route-specific title
        // instead of networkidle (some pages keep background activity alive
        // and never go fully idle).
        await page
          .waitForFunction(() => document.title && document.title !== "Liefro", { timeout: 8000 })
          .catch(() => {
            console.warn(`[prerender] ${route}: title never updated within 8s, saving as-is`);
          });
        const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);

        const outDir = route === "/" ? path.join(root, "dist") : path.join(root, "dist", route.slice(1));
        await mkdir(outDir, { recursive: true });
        await writeFile(path.join(outDir, "index.html"), html, "utf-8");
        console.log(`[prerender] ${route} -> ${path.relative(root, path.join(outDir, "index.html"))}`);
      } catch (err) {
        failures.push(route);
        console.warn(`[prerender] ${route} failed: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await server.httpServer.close();
  }

  if (failures.length) {
    console.warn(`[prerender] ${failures.length} route(s) kept their plain build output: ${failures.join(", ")}`);
  }
}

run().catch((err) => {
  console.error("[prerender] failed:", err);
  // Non-fatal: keep the plain SPA build so a prerender bug never blocks deploys.
  process.exit(0);
});
