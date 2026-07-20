"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import Reveal from "./Reveal";
import manifest from "./bfa-manifest.json";

// Maps a logical name (coreyfunk.webp) to the content-hashed file on disk
// (coreyfunk.b5400fd0.webp), so replacing an image changes its URL and no stale
// copy can survive in the next/image, browser or CDN caches.
// Regenerate with: node scripts/optimize-bfa.mjs
const src = (file: string) =>
  `/thumbnails/BFA/${(manifest as Record<string, string>)[file] ?? file}`;

// NOTE: the "v2" suffix does NOT reliably mark the finished art — it is the raw
// frame for most pairs but the final for "iman". Always open both files and check
// before wiring up a new pair; don't infer it from the filename.
const pairs = [
  { id: "elon", label: "Elon — $1 Trillion", client: "News / Finance", before: "Elonv2.webp", after: "Elon.webp" },
  { id: "baseball", label: "Baseball Cannon", client: "Tech / Experiment", before: "Baseballv2.webp", after: "Baseball.webp" },
  { id: "couchlock", label: "Couch Lock News", client: "Documentary", before: "CouchLockv2.webp", after: "CouchLock.webp" },
  { id: "coreyfunk", label: "Corey Funk — Waterpark", client: "Corey Funk", before: "coreyfunkv2.webp", after: "coreyfunk.webp" },
  { id: "coreyfunk2", label: "Corey Funk — Truck Bed Pool", client: "Corey Funk", before: "coreyfunk2v2.webp", after: "coreyfunk2.webp" },
  { id: "iman", label: "Iman — 90 Days", client: "Iman", before: "iman.webp", after: "imanv2.webp" },
];

export default function BeforeAfter({ index = "03" }: { index?: string }) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const pair = pairs[active];

  const moveTo = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    moveTo(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    moveTo(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  const selectPair = (i: number) => {
    setActive(i);
    setPos(50);
  };

  return (
    <section id="before-after" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Before / After</span>
          </div>
        </div>
        <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              From raw to <em className="italic">clickable</em>
            </h2>
          </div>
          <p className="max-w-md text-(--color-fg-2)">
            Drag the handle to see the difference. Same footage, same idea — what changes is{" "}
            <strong className="text-(--color-fg)">contrast, focus, and story</strong>.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`relative aspect-video w-full touch-none select-none overflow-hidden rounded-xl bg-(--color-surface-2) ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* After (full width, underneath) */}
          <Image
            key={`${pair.id}-after`}
            src={src(pair.after)}
            alt={`${pair.label} — final thumbnail`}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
            priority
            draggable={false}
          />

          {/* Before (clipped from the left) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              key={`${pair.id}-before`}
              src={src(pair.before)}
              alt={`${pair.label} — original frame`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
              draggable={false}
            />
          </div>

          {/* Corner labels */}
          <span
            className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-opacity duration-200"
            style={{ opacity: pos > 12 ? 1 : 0 }}
          >
            Before
          </span>
          <span
            className="pointer-events-none absolute right-4 top-4 rounded-full bg-(--color-accent-warm) px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-bg) transition-opacity duration-200"
            style={{ opacity: pos < 88 ? 1 : 0 }}
          >
            After
          </span>

          {/* Divider + handle */}
          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-[0_0_18px_rgba(0,0,0,0.55)]"
            style={{ left: `${pos}%` }}
          >
            <div
              role="slider"
              tabIndex={0}
              aria-label={`Reveal before and after for ${pair.label}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% before`}
              onKeyDown={onKeyDown}
              className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-white text-(--color-bg) shadow-[0_10px_30px_-6px_rgba(0,0,0,0.7)] transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-2xl leading-tight text-(--color-fg)">{pair.label}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted)">
              {pair.client}
            </p>
          </div>

          {/* Wraps to a second row rather than squeezing as pairs are added. */}
          <div className="flex flex-wrap gap-3 md:w-[480px]">
            {pairs.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPair(i)}
                aria-label={`Show ${p.label}`}
                aria-current={i === active ? "true" : undefined}
                className={`relative aspect-video w-[calc(33.333%-0.5rem)] shrink-0 overflow-hidden rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-(--color-fg) focus:ring-offset-2 focus:ring-offset-(--color-bg) ${
                  i === active
                    ? "ring-2 ring-(--color-accent-warm)"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={src(p.after)}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
