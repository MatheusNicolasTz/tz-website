"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";

const thumbs = [
  "tmb1.png","tmb2.png","tmb3.png","tmb4.png","tmb5.png",
  "tmb6.png","tmb7.png","tmb8.png","tmb9.png","tmb10.png",
  "tmb11.png","tmb12.png","tmb13.png","tmb15.png","tmb16.png",
  "tmb17.png","tmb18.png","tmb19.png","tmb20.png","tmb21.png",
];

export default function Thumbnails() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="thumbnails" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[--color-muted]">
              — Portfolio
            </span>
            <h2 className="mt-4 font-serif text-5xl leading-[1] tracking-tight text-[--color-fg] md:text-6xl">
              Thumbnails that <em className="italic">convert</em>
            </h2>
          </div>
          <p className="max-w-md text-[--color-fg-2]">
            Over <strong className="text-[--color-fg]">500M+ YouTube views</strong> driven — from
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
              onClick={() => setActive(file)}
              className="group relative block aspect-video w-full overflow-hidden rounded-md bg-[--color-surface-2] focus:outline-none focus:ring-2 focus:ring-[--color-fg] focus:ring-offset-2 focus:ring-offset-[--color-bg]"
              aria-label={`Open thumbnail ${i + 1}`}
            >
              <Image
                src={`/thumbnails/${file}`}
                alt={`Thumbnail ${i + 1} — TzDev`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-all duration-[700ms] ease-out group-hover:scale-[1.08] group-hover:blur-[2px]"
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

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[--color-fg]/85 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 rounded-full bg-[--color-bg] p-2 text-[--color-fg] transition-transform hover:scale-110"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/thumbnails/${active}`}
              alt="Featured thumbnail"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
