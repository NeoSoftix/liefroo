const puppeteer = require("puppeteer");

const routes = ["/", "/about", "/products", "/online-ordering", "/website-development"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1366, height: 800 },
  { name: "desktop", width: 1920, height: 1080 },
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const route of routes) {
    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      try {
        await page.goto(`http://localhost:5173${route}`, { waitUntil: "networkidle0", timeout: 15000 });
      } catch (e) {
        console.log("nav error", route, e.message);
        continue;
      }
      const bodyWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      const overflow = bodyWidth > clientWidth + 1;
      console.log(route, vp.name, "scrollWidth=", bodyWidth, "clientWidth=", clientWidth, overflow ? "OVERFLOW!" : "ok");
      const safeName = route.replace(/\//g, "_") || "_home";
      await page.screenshot({ path: `C:/Users/DELL/AppData/Local/Temp/claude/c--Users-DELL-OneDrive-Desktop-liefroo/0d7285d0-c2a9-4056-8dc3-afb2bbd8ea41/scratchpad/${safeName}_${vp.name}.png`, fullPage: true });
    }
  }
  await browser.close();
})();
