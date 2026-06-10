import puppeteer from "puppeteer-core";
import fs from "node:fs";

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgePaths.find((p) => fs.existsSync(p));

const url = process.argv[2] ?? "http://localhost:3001";
const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--enable-unsafe-swiftshader", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1680, height: 1050 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

const snapshot = async () => {
  return page.evaluate(() => ({
    thumbnails: !!document.querySelector("#thumbnails"),
    clients: !!document.querySelector("#clients"),
    projects: !!document.querySelector("#projects"),
    serviceCount: document.querySelectorAll("#services article").length,
    heroWord: document.querySelector(".word-rotate-enter")?.textContent,
    navLinks: [...document.querySelectorAll("nav a")].map((a) => a.textContent.trim()),
  }));
};

const clickMode = async (label) => {
  await page.evaluate((l) => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === l);
    btn?.click();
  }, label);
  await new Promise((r) => setTimeout(r, 800));
};

console.log("ALL:", JSON.stringify(await snapshot()));
await clickMode("Designer");
console.log("DESIGNER:", JSON.stringify(await snapshot()));
await page.screenshot({ path: process.argv[3] ?? "mode-designer.png" });
await clickMode("Designer"); // toggle off -> all
console.log("ALL AGAIN:", JSON.stringify(await snapshot()));
await clickMode("Dev");
console.log("DEV:", JSON.stringify(await snapshot()));
await page.screenshot({ path: process.argv[4] ?? "mode-dev.png" });
await browser.close();
