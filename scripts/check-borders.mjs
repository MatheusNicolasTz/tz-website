import puppeteer from "puppeteer-core";
import fs from "node:fs";

const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const executablePath = edgePaths.find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1680, height: 1050 });
await page.goto(process.argv[2] ?? "http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });

const result = await page.evaluate(() => {
  const out = [];
  const header = document.querySelector("header");
  if (header) out.push("header border-b: " + getComputedStyle(header).borderBottomWidth + " " + getComputedStyle(header).borderBottomColor);
  const stat = document.querySelectorAll(".divide-x > div")[1];
  if (stat) out.push("stats divide: " + getComputedStyle(stat).borderLeftWidth + " " + getComputedStyle(stat).borderLeftColor);
  const strip = document.querySelector(".border-y");
  if (strip) out.push("strip border-y: " + getComputedStyle(strip).borderTopWidth + " " + getComputedStyle(strip).borderTopColor);
  const muted = document.querySelector("h1");
  if (muted) out.push("h1 color: " + getComputedStyle(muted).color);
  return out;
});
console.log(result.join("\n"));
await browser.close();
