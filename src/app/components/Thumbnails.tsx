"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Reveal from "./Reveal";

const thumbs = [
  "tmb1.webp","tmb2.webp","tmb3.webp","tmb4.webp","tmb5.webp",
  "tmb6.webp","tmb7.webp","tmb8.webp","tmb9.webp","tmb10.webp",
  "tmb11.webp","tmb12.webp","tmb13.webp","tmb15.webp","tmb16.webp",
  "tmb17.webp","tmb18.webp","tmb19.webp","tmb20.webp","tmb21.webp",
];

export default function Thumbnails() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + thumbs.length) % thumbs.length));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % thumbs.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, prev, next]);

  return (
    <section id="thumbnails" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>(02)</span>
            <span>Portfolio</span>
          </div>
        </div>
        <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              Thumbnails that <em className="italic">convert</em>
            </h2>
          </div>
          <p className="max-w-md text-(--color-fg-2)">
            Over <strong className="text-(--color-fg)">500M+ YouTube views</strong> driven — from
            Like Nastya (130M+ subs) to Khalid Al Ameri, Corey Funk, Koreannosh, and Hudson Matter.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {thumbs.map((file, i) => (
            <button
              key={file}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative block aspect-video w-full overflow-hidden rounded-md bg-(--color-surface-2) focus:outline-none focus:ring-2 focus:ring-(--color-fg) focus:ring-offset-2 focus:ring-offset-(--color-bg)"
              aria-label={`Open thumbnail ${i + 1}`}
            >
              <Image
                src={`/thumbnails/${file}`}
                alt={`Thumbnail ${i + 1} — TzDev`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.08] group-hover:blur-[2px]"
                priority={i < 4}
              />

              {/* Strong dark wash + slight desaturation on hover */}
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-400 group-hover:bg-black/65" />

              {/* Centered solid CTA */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="flex translate-y-1 scale-90 items-center gap-2 rounded-full border border-white/90 bg-white/5 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white opacity-0 shadow-[0_14px_36px_-10px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
                  </svg>
                  Expand
                </span>
              </div>

              {/* Top-left index */}
              <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white opacity-0 transition-opacity duration-300 [text-shadow:0_2px_6px_rgba(0,0,0,0.9)] group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")} / {String(thumbs.length).padStart(2, "0")}
              </div>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <a
          href="https://www.unlayered.design/p/40-tz"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 flex flex-col gap-3 border-y border-(--color-border) py-7 md:flex-row md:items-baseline md:justify-between md:gap-8"
        >
          <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
            <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-(--color-accent-warm)">
              Featured in · Unlayered
            </span>
            <span className="font-serif text-2xl leading-tight text-(--color-fg) md:text-3xl">
              Issue #40 — TZ{" "}
              <em className="italic text-(--color-fg-2)">· thumbnail breakdown &amp; workflow</em>
            </span>
          </div>
          <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted) transition-colors group-hover:text-(--color-fg)">
            Read article
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </span>
        </a>
      </Reveal>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 rounded-full bg-(--color-fg) p-2 text-(--color-bg) transition-transform hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          {/* Prev */}
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-(--color-fg) p-3 text-(--color-bg) shadow-lg transition-transform hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={thumbs[activeIndex]}
              src={`/thumbnails/${thumbs[activeIndex]}`}
              alt={`Thumbnail ${activeIndex + 1} — TzDev`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>

          {/* Preload adjacent images */}
          <div className="hidden" aria-hidden="true">
            <Image
              src={`/thumbnails/${thumbs[(activeIndex + 1) % thumbs.length]}`}
              alt="" width={1024} height={576}
              sizes="1024px" priority
            />
            <Image
              src={`/thumbnails/${thumbs[(activeIndex - 1 + thumbs.length) % thumbs.length]}`}
              alt="" width={1024} height={576}
              sizes="1024px" priority
            />
          </div>

          {/* Next */}
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-(--color-fg) p-3 text-(--color-bg) shadow-lg transition-transform hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
            {String(activeIndex + 1).padStart(2, "0")} / {String(thumbs.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}
