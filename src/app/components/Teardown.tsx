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
  original: { img: string; title: string };
  mine: { img: string; title?: string };
  /**
   * NOT RENDERED. Both fields were pulled off the page so the pair of images has
   * to carry the argument on its own: `videoUrl` was a "watch the original" link
   * and `notes` was a written breakdown of each case. Kept because they are the
   * source and the thinking behind every teardown, and cost nothing to hold.
   */
  videoUrl: string;
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
      "The original spends the thumbnail on the number the title already gives away: $2967 stamped next to “for under $3000”. Two slots, one idea.",
      "So the price stays in the title, and the thumbnail takes the payoff the title can’t show: the result, and the part that buys it.",
      "One number, one object, one arrow. That still reads in a sidebar at a third of the size. A crossed-out price and a callout bubble don’t.",
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
      "The title promises destruction. The frame shows the car intact, mid-cruise, not a scratch on it. The one thing the video is about is missing from the image.",
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
    mine: {
      img: "/thumbnails/tmb28.webp",
      title: "I Built An Arcade In My Room",
    },
    notes: [
      "The title sells a room reveal. The frame sells $3000, and the loudest thing in it is a number the title never mentions.",
      "So the room becomes the subject and names itself inside the frame: the neon sign, the cabinets, the bed. You know what you’re getting before reading a word.",
      "The reaction is pulled out at full scale and the door edge frames it as walking in: a face to read at any size, and a reveal to step into.",
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
    mine: {
      img: "/thumbnails/tmb26.webp",
      title: "The Ultimate Katana Test",
    },
    notes: [
      "The title names both objects, then the frame shows both objects. The image confirms the title instead of adding to it.",
      "Mine names one object instead of two and stops grading the throw. The title sets the stakes, and the frame is what settles them.",
      "The hit is frozen at the split with the debris still travelling. The original lights the impact; this one shows it happening.",
    ],
  },
  {
    id: "trendy",
    channel: "Trendy Treats",
    videoUrl: "https://youtu.be/CQbRNZLMGCw",
    original: {
      img: "/thumbnails/teardown/trendy-original.webp",
      title: "Jolly Rancher Knife Vs. Air Head Fork",
    },
    mine: {
      img: "/thumbnails/tmb30.webp",
      title: "I Made Her A Candy Knife!",
    },
    notes: [
      "Five objects fight over the same frame: cleaver, candy spoon, gummy fork, giant spoon, the bins behind them. The title names two of them, and nothing in the image is bigger than anything else, so the eye lands nowhere.",
      "“Vs.” is a spec sheet: two products, no stake. Mine makes it a person and a gift, and drops the brand names the image was never going to prove anyway.",
      "One object, one question. The blades meet at the torn join, the word asks the only thing worth asking, and the arrow lands on the answer. The room behind is stripped back to the candy wall so nothing else competes.",
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
          alt={`${label}: ${title}`}
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

// The pair itself, shared by the inline sample and the dialog so the two can
// never drift apart.
function Comparison({ t, priority }: { t: Teardown; priority?: boolean }) {
  return (
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
              Real videos, re-pitched. Not a redesign for the sake of it, but a{" "}
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
          {/* Four of the five cases live behind this button, so it is the most
              important thing in the section after the pair itself. Solid fill
              rather than an outline: on this background an outlined pill reads as
              a footnote. The "01 / 05" counter that used to sit under it is gone,
              since it only repeated the number already in the label. */}
          <div className="mt-14 flex flex-col items-center border-t border-(--color-border) pt-10">
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="group inline-flex items-center gap-3 rounded-full bg-(--color-fg) px-8 py-4 text-base font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
            >
              See all {teardowns.length} teardowns
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
              </svg>
            </button>
          </div>
        </Reveal>
      )}

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Teardown ${open + 1} of ${teardowns.length}: ${teardowns[open].channel}`}
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
