import sharp from "sharp";
import path from "node:path";

// Portfolio grid art. New sources get dropped into the BFA folder (it is the one
// spot under public/thumbnails that .gitignore keeps out of the repo), and only
// the 1280px webp emitted here is committed and deployed.
const srcDir = "c:/Users/mathe/Downloads/Tz-Website/public/thumbnails/BFA";
const outDir = "c:/Users/mathe/Downloads/Tz-Website/public/thumbnails";

// [sourceFile, outputWebp] — output names continue the tmbN sequence read by
// Thumbnails.tsx. Never reuse a number for different art: the grid serves these
// under a plain, unhashed name, so a recycled name keeps serving the old image
// from the next/image, browser and CDN caches.
const files = [
  ["Unspeakable.jpg", "tmb22.webp"],
  ["Donutv3.jpg", "tmb23.webp"],
  ["preston-(1).jpg", "tmb24.webp"],
  ["Purple.jpg", "tmb25.webp"],
  ["Ishan3.png", "tmb26.webp"],
  ["Ishan6.png", "tmb27.webp"],
  ["Ishan9.png", "tmb28.webp"],
  ["Patchbay-Media-v3.jpg", "tmb29.webp"],
];

for (const [src, out] of files) {
  try {
    const result = await sharp(path.join(srcDir, src))
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, out));
    console.log(out, Math.round(result.size / 1024) + "KB", `${result.width}x${result.height}`);
  } catch (err) {
    console.warn(`skip ${src}: ${err.message}`);
  }
}
