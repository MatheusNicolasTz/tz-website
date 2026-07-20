import sharp from "sharp";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Before/after thumbnail sources live next to their optimized output so the
// originals stay easy to swap out. Re-run this after replacing any source file.
const dir = "c:/Users/mathe/Downloads/Tz-Website/public/thumbnails/BFA";
const manifestPath = "c:/Users/mathe/Downloads/Tz-Website/src/app/components/bfa-manifest.json";

// [sourceFile, outputName] — output names are lowercase and free of parens/spaces
// so they are safe to use directly in URLs. The emitted file gets a content hash
// spliced in (coreyfunk.webp -> coreyfunk.b5400fd0.webp); BeforeAfter.tsx resolves
// the real name through bfa-manifest.json.
//
// The hash is what makes replacing an image safe: next/image, browsers and the CDN
// all cache by URL, so reusing a filename keeps serving the old art no matter how
// many times you rebuild.
const files = [
  ["Elon.jpg", "Elon.webp"],
  ["Elonv2.jpg", "Elonv2.webp"],
  ["Baseball.png", "Baseball.webp"],
  ["Baseballv2.png", "Baseballv2.webp"],
  ["CouchLock.jpg", "CouchLock.webp"],
  ["CouchLockv2.jpg", "CouchLockv2.webp"],
  ["coreyfunk.jpg", "coreyfunk.webp"],
  ["coreyfunkv2.jpg", "coreyfunkv2.webp"],
  ["CoreyFunk-(6).png", "coreyfunk2.webp"],
  ["CoreyFunk-(6)v2.png", "coreyfunk2v2.webp"],
  ["iman.png", "iman.webp"],
  ["Imanv2.png", "imanv2.webp"],
];

const manifest = {};
let built = 0;

for (const [src, out] of files) {
  const srcPath = path.join(dir, src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`skip        ${src}: source missing`);
    continue;
  }

  const base = out.replace(/\.webp$/, "");
  const hash = crypto.createHash("md5").update(fs.readFileSync(srcPath)).digest("hex").slice(0, 8);
  const hashed = `${base}.${hash}.webp`;
  manifest[out] = hashed;

  // Drop hashed outputs from earlier versions of this source, plus the unhashed
  // name this script used to emit.
  for (const f of fs.readdirSync(dir)) {
    if (f !== hashed && (f === out || new RegExp(`^${base}\\.[0-9a-f]{8}\\.webp$`).test(f))) {
      fs.unlinkSync(path.join(dir, f));
      console.log(`removed     ${f}`);
    }
  }

  if (fs.existsSync(path.join(dir, hashed))) {
    console.log(`up to date  ${hashed}`);
    continue;
  }

  const result = await sharp(srcPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(dir, hashed));
  console.log(`built       ${hashed}  ${Math.round(result.size / 1024)}KB  ${result.width}x${result.height}`);
  built++;
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nwrote bfa-manifest.json (${Object.keys(manifest).length} entries)`);

if (built > 0) {
  const imageCache = "c:/Users/mathe/Downloads/Tz-Website/.next/cache/images";
  if (fs.existsSync(imageCache)) {
    fs.rmSync(imageCache, { recursive: true, force: true });
    console.log("cleared .next/cache/images");
  }
}
