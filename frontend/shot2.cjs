const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "shot_home_vp.png" });

  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("http://localhost:5173/about", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "shot_about_vp.png", fullPage: true });

  await browser.close();
})();
