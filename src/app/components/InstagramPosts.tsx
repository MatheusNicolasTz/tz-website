"use client";

import { useEffect, useRef, useState } from "react";
import type { IgPost } from "./adventure-posts";
import { igEmbedUrl } from "./adventure-posts";

// Instagram serves nothing to a logged-out reader, so there is no cover to pull
// and store the way scripts/optimize-x-posts.mjs does for the X posts. The only
// way to actually show these posts is Instagram's own embed.
//
// This renders the embed iframe directly instead of loading embeds.js. The script
// would drag in ~100KB of third-party JS and, worse, it upgrades a <blockquote>
// placeholder in place, so every post flashes as a bare link first. The one thing
// the script does that an iframe cannot do alone is resize the frame: the embed
// page reports its rendered height to the parent as a JSON postMessage of
// { type: "MEASURE", details: { height } }. Listening for that ourselves is the
// whole of what we lose by skipping it.
//
// Until that message arrives (or if it never does) the frame sits at FALLBACK_H,
// which fits a square post with its caption at these column widths.
const FALLBACK_H = 660;

// Every card takes the tallest measured height rather than its own. Captions run
// to different lengths, so per-post heights leave the grid rows ragged; the slack
// this adds is white space inside an already white card, which reads as padding.

export default function InstagramPosts({ posts }: { posts: IgPost[] }) {
  const frames = useRef<(HTMLIFrameElement | null)[]>([]);
  const [heights, setHeights] = useState<Record<number, number>>({});

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!/^https:\/\/www\.instagram\.com$/.test(e.origin)) return;

      let height: unknown;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.type !== "MEASURE") return;
        height = data.details?.height;
      } catch {
        return;
      }
      if (typeof height !== "number" || height < 100) return;

      const i = frames.current.findIndex((f) => f && f.contentWindow === e.source);
      if (i === -1) return;
      setHeights((prev) => (prev[i] === height ? prev : { ...prev, [i]: height as number }));
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const measured = Object.values(heights);
  const rowHeight = measured.length ? Math.max(...measured) : FALLBACK_H;

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <div
          key={p.url}
          className="overflow-hidden rounded-lg bg-white ring-1 ring-(--color-border) transition-colors hover:ring-(--color-border-strong)"
          style={{ height: rowHeight }}
        >
          <iframe
            ref={(el) => {
              frames.current[i] = el;
            }}
            src={igEmbedUrl(p.url)}
            title={p.label ?? `Instagram post ${String(i + 1).padStart(2, "0")}`}
            loading="lazy"
            scrolling="no"
            frameBorder={0}
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ))}
    </div>
  );
}
