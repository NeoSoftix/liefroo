// Runs after `vite build`. Boots the built app on a local static server, visits
// every locale x route combination with headless Chrome, and overwrites
// dist/<lng>/<route>/index.html with the fully-rendered HTML — so
// <title>/OG/meta tags set by react-helmet-async are present in the raw HTML
// for crawlers and "View Source", not just after client-side JS runs.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { prerenderablePaths, LOCALES, DEFAULT_LOCALE } from "../src/routesConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

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

  // Each locale's home route now writes to its own directory (dist/de/,
  // dist/en/) instead of colliding with root dist/index.html, so there's no
  // more "process home last" ordering hack needed.
  const allRoutes = LOCALES.flatMap((lng) =>
    prerenderablePaths.map((p) => `/${lng}${p === "/" ? "" : p}`)
  );
  const failures = [];

  try {
    for (const route of allRoutes) {
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

        const outDir = path.join(root, "dist", ...route.slice(1).split("/"));
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

    // Bare-domain hits (no locale prefix) still need something sensible at
    // dist/index.html: copy the default locale's baked home page so direct
    // hits to https://www.liefro.com/ get correct OG tags + a canonical
    // pointing at /<DEFAULT_LOCALE>. The client-side <Navigate> in App.jsx
    // then moves any JS-enabled visitor to /<DEFAULT_LOCALE> immediately.
    await copyFile(
      path.join(root, "dist", DEFAULT_LOCALE, "index.html"),
      path.join(root, "dist", "index.html")
    );
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
