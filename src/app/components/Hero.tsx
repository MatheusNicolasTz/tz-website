import Image from "next/image";
import GlobeLazy from "./GlobeLazy";

const strip = [
  "tmb1.webp", "tmb2.webp", "tmb3.webp", "tmb4.webp",
  "tmb5.webp", "tmb6.webp", "tmb7.webp", "tmb8.webp",
  "tmb9.webp", "tmb10.webp", "tmb11.webp", "tmb12.webp",
  "tmb13.webp", "tmb15.webp", "tmb16.webp", "tmb17.webp",
  "tmb18.webp", "tmb19.webp", "tmb20.webp", "tmb21.webp",
];

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-14 md:px-10 md:pt-40 md:pb-20">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-muted)">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-accent-warm) pulse-dot" />
            Available · 2026
          </span>
          <span className="hidden sm:inline">Matheus Nicolas — aka TzDev</span>
        </div>

        <div
          className="absolute right-2 top-24 hidden lg:block xl:right-12"
          style={{ width: 540, height: 540 }}
        >
          <GlobeLazy />
        </div>

        <h1 className="relative mt-10 text-(--color-fg)">
          <span className="block font-serif text-[7vw] italic leading-[1.05] tracking-[-0.01em] text-(--color-fg-2) md:text-6xl">
            I am a
          </span>
          <span className="block font-sans text-[13vw] font-black uppercase leading-[0.92] tracking-[-0.03em] md:text-[8.5rem] lg:text-[10.5rem]">
            Designer
          </span>
          <span className="block font-serif text-[10vw] italic leading-[1.05] tracking-[-0.02em] text-(--color-fg-2) md:text-[6.5rem] lg:text-[8rem]">
            &amp; <span className="text-(--color-accent-warm)">developer</span>.
          </span>
        </h1>

        <div className="relative mt-12 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-(--color-fg-2) md:text-xl">
            Known as <strong className="font-medium text-(--color-fg)">TzDev</strong>.
            I design high-performing <em className="font-serif italic">thumbnails</em> and logos,
            while building <strong className="font-medium text-(--color-fg)">full-stack web apps, mobile apps, and APIs</strong> end-to-end.
            Founder of <strong className="font-medium text-(--color-fg)">Adventure AI</strong>.
            My work has generated <span className="text-(--color-fg)">500M+ YouTube views</span> for
            some of the world&apos;s biggest creators.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href="#thumbnails"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-fg) px-6 py-3 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
            >
              View work
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

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 divide-x divide-(--color-border) border-b border-(--color-border) md:grid-cols-3">
          {[
            { n: "500M+", l: "YouTube views" },
            { n: "20+", l: "Top-tier creators" },
            { n: "2", l: "Apps in the works" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col gap-2 py-8 ${i === 0 ? "pr-6" : "px-6"}`}
            >
              <span className="font-serif text-4xl leading-none text-(--color-fg) md:text-5xl">
                {s.n}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-(--color-muted)">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
