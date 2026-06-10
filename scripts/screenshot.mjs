import puppeteer from "puppeteer-core";
import fs from "node:fs";

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgePaths.find((p) => fs.existsSync(p));

const url = process.argv[2] ?? "http://localhost:3000";
const out = process.argv[3] ?? "screenshot.png";
const scrollY = Number(process.argv[4] ?? 0);

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const page = await browser.newPage();
const clip = process.argv[5]
  ? (() => {
      const [x, y, width, height] = process.argv[5].split(",").map(Number);
      return { x, y, width, height };
    })()
  : undefined;

await page.setViewport({ width: 1680, height: 1050, deviceScaleFactor: clip ? 2 : 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
if (scrollY > 0) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), scrollY);
}
await new Promise((r) => setTimeout(r, 4000));
await page.screenshot({ path: out, clip });
await browser.close();
console.log("saved", out);
