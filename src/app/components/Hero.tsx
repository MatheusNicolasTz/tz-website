import Image from "next/image";

const strip = [
  "tmb1.webp", "tmb2.webp", "tmb3.webp", "tmb4.webp",
  "tmb5.webp", "tmb6.webp", "tmb7.webp", "tmb8.webp",
  "tmb9.webp", "tmb10.webp", "tmb11.webp", "tmb12.webp",
  "tmb13.webp", "tmb15.webp", "tmb16.webp", "tmb17.webp",
  "tmb18.webp", "tmb19.webp", "tmb20.webp", "tmb21.webp",
];

type HeroProps = {
  mode?: "dev" | "design";
};

const copy = {
  dev: {
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
  design: {
    big: "Designer",
    small: <>&amp; <span className="text-(--color-accent-warm)">developer</span>.</>,
    lead: (
      <>
        I design <em className="font-serif italic">thumbnails</em> and logos for serious creators.
        My work has driven <strong className="font-medium text-(--color-fg)">500M+ YouTube views</strong>.
      </>
    ),
    cta: { href: "#thumbnails", label: "View work" },
  },
};

export default function Hero({ mode = "design" }: HeroProps) {
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
            I am a
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

      {mode === "design" && (
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
