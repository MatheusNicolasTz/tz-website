import Image from "next/image";
import { thumbs as strip } from "./thumbs";

type HeroProps = {
  mode?: "dev" | "thumbnails";
};

const copy = {
  dev: {
    pre: "I am a",
    big: "Developer",
    small: <>&amp; <span className="text-(--color-accent-warm)">designer</span>.</>,
    lead: (
      <>
        I build <em className="font-serif italic">web apps</em> and mobile apps end-to-end —
        currently shipping <strong className="font-medium text-(--color-fg)">Adventure AI</strong>, an
        NVIDIA Inception member.
      </>
    ),
    cta: { href: "#projects", label: "View projects" },
  },
  thumbnails: {
    pre: "I design",
    big: "Thumbnails",
    small: <>that <span className="text-(--color-accent-warm)">earn</span> the click.</>,
    lead: (
      <>
        I design <em className="font-serif italic">YouTube thumbnails</em> and the strategy behind
        them — for creators who treat CTR as a number, not a vibe.{" "}
        <strong className="font-medium text-(--color-fg)">500M+ views</strong> driven so far.
      </>
    ),
    cta: { href: "#strategy", label: "How I think" },
  },
};

export default function Hero({ mode = "thumbnails" }: HeroProps) {
  const c = copy[mode];

  return (
    <section className="relative">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 pb-8 text-center md:px-10 md:pt-28 md:pb-10">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-muted)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent-warm) pulse-dot" />
          Available · 2026
        </div>

        <h1 className="relative mt-6 text-(--color-fg)">
          <span className="block font-serif text-[6vw] italic leading-[1.05] tracking-[-0.01em] text-(--color-fg-2) md:text-5xl">
            {c.pre}
          </span>
          <span className="block font-sans text-[12vw] font-black uppercase leading-[0.92] tracking-[-0.03em] md:text-[7rem] lg:text-[8.5rem]">
            {c.big}
          </span>
          <span className="block font-serif text-[9vw] italic leading-[1.05] tracking-[-0.02em] text-(--color-fg-2) md:text-[5.5rem] lg:text-[6.5rem]">
            {c.small}
          </span>
        </h1>

        <div className="relative mt-8 flex flex-col items-center gap-6">
          <p className="max-w-xl text-base leading-relaxed text-(--color-fg-2) md:text-lg">
            {c.lead}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={c.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-fg) px-6 py-3 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
            >
              {c.cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 bg-transparent px-6 py-3 text-sm font-medium text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
            >
              Let&apos;s chat
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {mode === "thumbnails" && (
        <div className="relative overflow-hidden border-y border-(--color-border) bg-(--color-bg-2) py-6">
          <div className="flex w-max marquee-track gap-4 pr-4">
            {[...strip, ...strip].map((file, i) => (
              <div
                key={`${file}-${i}`}
                className="relative h-32 w-56 shrink-0 overflow-hidden rounded-md bg-(--color-surface-2) ring-1 ring-white/5 md:h-40 md:w-72"
              >
                <Image
                  src={`/thumbnails/${file}`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 224px, 288px"
                  className="object-cover"
                  priority={i < 5}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
