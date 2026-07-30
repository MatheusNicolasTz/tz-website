"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";

// Real videos, re-pitched: the original title/thumbnail pair next to the one I'd
// ship. Both sides are rendered as the viewer actually meets them — a card in a
// feed — because that is the only size where the decision is provable.
//
// To add one: drop the source thumbnail through scripts/optimize-thumbs.mjs (or
// into /thumbnails/teardown for a third-party original) and append here.
// `mine.title` is optional: sometimes the title already works and only the frame
// has to change. Leave it out and the original title carries over to both cards.
type Teardown = {
  id: string;
  channel: string;
  videoUrl: string;
  original: { img: string; title: string };
  mine: { img: string; title?: string };
  notes: string[];
};

const teardowns: Teardown[] = [
  {
    id: "donut",
    channel: "Donut",
    videoUrl: "https://youtu.be/aGBP4psXjUg",
    original: {
      img: "/thumbnails/teardown/donut-original.webp",
      title: "Making a Slow Car Fast (for under $3000)",
    },
    mine: {
      img: "/thumbnails/tmb23.webp",
      title: "Making a Slow Car Fast with $3000",
    },
    notes: [
      "The original spends the thumbnail on the number the title already gives away — $2967 stamped next to “for under $3000”. Two slots, one idea.",
      "So the price stays in the title, and the thumbnail takes the payoff the title can’t show: the result, and the part that buys it.",
      "One number, one object, one arrow. That still reads in a sidebar at a third of the size — a crossed-out price and a callout bubble don’t.",
    ],
  },
  {
    id: "unspeakable",
    channel: "UnspeakableTV",
    videoUrl: "https://youtu.be/BYCxl7NN1So",
    original: {
      img: "/thumbnails/teardown/unspeakable-original.webp",
      title: "Destroying my Cardboard Lambo!",
    },
    mine: { img: "/thumbnails/tmb22.webp" },
    notes: [
      "The title promises destruction. The frame shows the car intact, mid-cruise, not a scratch on it — the one thing the video is about is missing from the image.",
      "The title already works, so it stays. It was never the problem.",
      "The frame delivers it instead: the lighter, the fuel trail, the car already going up. Cause and effect in a single read.",
    ],
  },
  {
    id: "arcade",
    channel: "Megan and Ben",
    videoUrl: "https://youtu.be/WmdAsE7dMoY",
    original: {
      img: "/thumbnails/teardown/arcade-original.webp",
      title: "We got rid of junk by building an arcade in our room",
    },
    mine: { img: "/thumbnails/tmb28.webp" },
    notes: [
      "The title sells a room reveal. The frame sells $3000 — the loudest thing in it is a number the title never mentions.",
      "So the room becomes the subject and names itself inside the frame: the neon sign, the cabinets, the bed. You know what you’re getting before reading a word.",
      "The reaction is pulled out at full scale and the door edge frames it as walking in — a face to read at any size, and a reveal to step into.",
    ],
  },
  {
    id: "katana",
    channel: "How Ridiculous",
    videoUrl: "https://youtu.be/07es8hOcnaI",
    original: {
      img: "/thumbnails/teardown/katana-original.webp",
      title: "The PERFECT Throw?! Glass Ball Vs Katana",
    },
    mine: { img: "/thumbnails/tmb26.webp" },
    notes: [
      "The title names both objects, then the frame shows both objects. The image confirms the title instead of adding to it.",
      "Mine drops the naming and keeps one word — impossible. The image carries the claim, the title carries the facts.",
      "The hit is frozen at the split with the debris still travelling. The original lights the impact; this one shows it happening.",
    ],
  },
];

function Card({
  img,
  title,
  channel,
  label,
  accent,
  priority,
  titleUnchanged,
}: {
  img: string;
  title: string;
  channel: string;
  label: string;
  accent?: boolean;
  priority?: boolean;
  titleUnchanged?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* The label sits above the frame, not on it — these thumbnails carry their
          own baked-in text, so an overlay collides with the art often enough. */}
      <span
        // Both variants keep a 1px border — transparent on the accent one — so the
        // two columns stay on the same baseline instead of drifting 2px apart.
        className={`w-fit rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${
          accent
            ? "border-transparent bg-(--color-accent-warm) text-(--color-bg)"
            : "border-(--color-border-strong) text-(--color-muted)"
        }`}
      >
        {label}
      </span>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-(--color-surface-2)">
        <Image
          src={img}
          alt={`${label} — ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </div>

      {/* Title block, sized the way a feed renders it — the real test of a title. */}
      <div className="flex gap-3">
        <span
          aria-hidden
          className="mt-0.5 h-9 w-9 shrink-0 rounded-full border border-(--color-border-strong) bg-(--color-surface)"
        />
        <div className="min-w-0">
          <p
            className={`text-[15px] font-semibold leading-snug ${
              accent ? "text-(--color-fg)" : "text-(--color-fg-2)"
            }`}
          >
            {title}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-muted)">
            {channel}
            {/* Without this, an identical title on both cards reads as an
                oversight rather than as the deliberate call it is. */}
            {titleUnchanged && <span className="text-(--color-fg-2)"> · title unchanged</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

// The pair plus its reasoning, shared by the inline sample and the dialog so the
// two can never drift apart.
function Comparison({ t, priority }: { t: Teardown; priority?: boolean }) {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        <Card
          img={t.original.img}
          title={t.original.title}
          channel={t.channel}
          label="Original"
          priority={priority}
        />
        <Card
          img={t.mine.img}
          title={t.mine.title ?? t.original.title}
          titleUnchanged={!t.mine.title}
          channel={t.channel}
          label="My version"
          accent
          priority={priority}
        />
      </div>

      <div className="mt-8 grid gap-6 border-t border-(--color-border) pt-6 md:grid-cols-[1fr_1.4fr] md:gap-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-(--color-accent-warm)">
            What changed
          </span>
          <a
            href={t.videoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-muted) transition-colors hover:text-(--color-fg)"
          >
            Watch the original
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
          </a>
        </div>

        <div className="space-y-3">
          {t.notes.map((n) => (
            <p key={n} className="leading-relaxed text-(--color-fg-2)">
              {n}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Teardown({ index = "04" }: { index?: string }) {
  // null = closed. The cases behind the dialog are never rendered until it opens,
  // so the page ships one comparison instead of four.
  const [open, setOpen] = useState<number | null>(null);
  const rest = teardowns.length - 1;

  const prev = useCallback(() => {
    setOpen((i) => (i === null ? null : (i - 1 + teardowns.length) % teardowns.length));
  }, []);

  const next = useCallback(() => {
    setOpen((i) => (i === null ? null : (i + 1) % teardowns.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  return (
    <section id="teardown" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Teardown</span>
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              Same video, sharper <em className="italic">promise</em>
            </h2>
            <p className="max-w-md text-(--color-fg-2)">
              Real videos, re-pitched. Not a redesign for the sake of it — a{" "}
              <strong className="text-(--color-fg)">different idea</strong> about what the title
              and the thumbnail should each be doing.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <Comparison t={teardowns[0]} priority />
      </Reveal>

      {rest > 0 && (
        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-3 border-t border-(--color-border) pt-10">
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="group inline-flex items-center gap-3 rounded-full border border-(--color-fg)/30 px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
            >
              See all {teardowns.length} teardowns
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted)">
              01 / {String(teardowns.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>
      )}

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Teardown ${open + 1} of ${teardowns.length} — ${teardowns[open].channel}`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm md:items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            // overscroll-contain stops the page behind from scrolling once the
            // panel hits its end — there is no body scroll lock to fight Lenis.
            className="relative my-auto w-full max-w-5xl overscroll-contain rounded-2xl border border-(--color-border) bg-(--color-bg) p-5 shadow-2xl md:p-9"
          >
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-(--color-border) pb-4">
              <div className="flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="text-(--color-accent-warm)">
                  {String(open + 1).padStart(2, "0")} / {String(teardowns.length).padStart(2, "0")}
                </span>
                <span className="text-(--color-muted)">{teardowns[open].channel}</span>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(null)}
                className="rounded-full bg-(--color-fg) p-2 text-(--color-bg) transition-transform hover:scale-110"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>

            <Comparison t={teardowns[open]} priority />

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-(--color-border) pt-5">
              <button
                type="button"
                onClick={prev}
                className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Prev
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
              >
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
