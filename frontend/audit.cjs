const puppeteer = require("puppeteer");

const routes = [
  "/", "/about", "/products", "/website-development", "/mobile-app-development",
  "/printer-integration", "/pos-system-development", "/technical-support",
  "/menu-management", "/google-business-seo", "/meta-ads", "/google-ads",
  "/online-ordering", "/google-analytics", "/reservation-system", "/qr-ordering",
];

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 900 },
  { name: "desktop", width: 1920, height: 1080 },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const route of routes) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      try {
        await page.goto(`http://localhost:5173${route}`, { waitUntil: "networkidle0", timeout: 20000 });
      } catch (e) {
        console.log(route, vp.name, "NAV ERROR", e.message);
        continue;
      }

      const issues = await page.evaluate(() => {
        const results = [];
        const nodes = document.querySelectorAll("div,section");
        nodes.forEach((el) => {
          const style = getComputedStyle(el);
          if (style.display !== "grid") return;
          const cols = style.gridTemplateColumns.split(" ").length;
          if (cols < 2) return;
          const children = Array.from(el.children).filter((c) => {
            const r = c.getBoundingClientRect();
            const cs = getComputedStyle(c);
            return r.width > 0 && r.height > 0 && cs.position !== "absolute" && cs.position !== "fixed";
          });
          if (children.length === 0) return;
          const rows = Math.ceil(children.length / cols);
          const lastRowCount = children.length - (rows - 1) * cols;
          if (rows > 1 && lastRowCount !== cols) {
            results.push({
              cols,
              itemCount: children.length,
              lastRowCount,
              className: el.className.toString().slice(0, 80),
            });
          }
        });
        return results;
      });

      if (issues.length) {
        console.log("---", route, vp.name, "---");
        issues.forEach((i) => console.log(JSON.stringify(i)));
      }
    }
  }

  await browser.close();
})();
