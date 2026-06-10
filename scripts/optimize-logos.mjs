import sharp from "sharp";
import path from "node:path";

const srcDir = "c:/Users/mathe/Downloads/Tz-Website/assets-src/logo-adv";
const outDir = "c:/Users/mathe/Downloads/Tz-Website/public/tz/logo-adv";

// [sourceFile, outputWebp]
const files = [
  ["69639957_logo_mockup_with_window_shadow_vol04.png", "adv-wall-purple.webp"],
  ["11620000.png", "adv-card.webp"],
  ["37641305_outdoor_billboard_mockup.png", "adv-billboard.webp"],
  ["8749860_893.png", "adv-surface.webp"],
  ["377539800_657bf711-eaf1-4e35-a433-eed432ffb993.png", "adv-mark.webp"],
];

for (const [src, out] of files) {
  try {
    const result = await sharp(path.join(srcDir, src))
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, out));
    console.log(out, Math.round(result.size / 1024) + "KB", `${result.width}x${result.height}`);
  } catch (err) {
    console.warn(`skip ${src}: ${err.message}`);
  }
}
