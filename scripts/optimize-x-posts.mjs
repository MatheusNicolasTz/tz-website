import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

// Covers for the Adventure AI campaign posts on X (Campaigns section, /dev).
// Each source is the video thumbnail X itself serves for the post, pulled once
// and stored locally so the page never depends on pbs.twimg.com being reachable.
//
// Re-run only if a post is swapped out. Order is chronological and matches
// src/app/components/adventure-posts.ts.
const outDir = "c:/Users/mathe/Downloads/Tz-Website/public/tz/adventure";

// [outputWebp, sourceThumbnailUrl]
const files = [
  ["x-01.webp", "https://pbs.twimg.com/amplify_video_thumb/2014685072041881600/img/8UASJheafa6BUXtw.jpg"],
  ["x-02.webp", "https://pbs.twimg.com/amplify_video_thumb/2018329549373616128/img/uf54tKFVXjdjR0tg.jpg"],
  ["x-03.webp", "https://pbs.twimg.com/amplify_video_thumb/2018822138401099776/img/VU0up23nO_cAPHmd.jpg"],
  ["x-04.webp", "https://pbs.twimg.com/amplify_video_thumb/2020332765229817856/img/_OmOCn-8sMg6xzFV.jpg"],
  ["x-05.webp", "https://pbs.twimg.com/amplify_video_thumb/2025396713612091392/img/vlGccitY7kXxBpC-.jpg"],
  ["x-06.webp", "https://pbs.twimg.com/amplify_video_thumb/2029761984086835200/img/vaVMLybuu45AxQN2.jpg"],
  ["x-07.webp", "https://pbs.twimg.com/amplify_video_thumb/2032073642956222464/img/vISNTYFKlXDqEmHr.jpg"],
  ["x-08.webp", "https://pbs.twimg.com/amplify_video_thumb/2033737685890678785/img/vvXcoRs-Ml2p4a8B.jpg"],
  ["x-09.webp", "https://pbs.twimg.com/amplify_video_thumb/2043022792724221955/img/1dP5bcWzM1nXSvQQ.jpg"],
  ["x-10.webp", "https://pbs.twimg.com/amplify_video_thumb/2061282655597916163/img/IINhiNy4BmTtX-xz.jpg"],
];

fs.mkdirSync(outDir, { recursive: true });

for (const [out, url] of files) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const result = await sharp(buf)
      .resize({ width: 960, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, out));
    console.log(out, Math.round(result.size / 1024) + "KB", `${result.width}x${result.height}`);
  } catch (err) {
    console.warn(`skip ${out}: ${err.message}`);
  }
}
