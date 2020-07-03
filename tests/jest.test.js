const pt = require("puppeteer");
let browser;
let page;
beforeEach(async () => {
  browser = await pt.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});
afterEach(async () => {
  await browser.close();
});
test("should ok", async () => {
  const text = await page.$eval;
});
