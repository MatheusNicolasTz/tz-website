const strip = [
  "tmb1.png", "tmb2.png", "tmb3.png", "tmb4.png",
  "tmb5.png", "tmb6.png", "tmb7.png", "tmb8.png",
  "tmb9.png", "tmb10.png", "tmb11.png", "tmb12.png",
  "tmb13.png", "tmb15.png", "tmb16.png", "tmb17.png",
  "tmb18.png", "tmb19.png", "tmb20.png", "tmb21.png",
];

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 md:px-10 md:pt-32 md:pb-16">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[--color-muted]">
          <span className="h-1.5 w-1.5 rounded-full bg-[--color-fg] pulse-dot" />
          Available · 2026
        </div>

        <h1 className="mt-6 font-serif text-[14vw] leading-[0.9] tracking-[-0.02em] text-[--color-fg] md:text-[8.5rem] lg:text-[10rem]">
          Matheus<br />
          <span className="italic text-[--color-fg-2]">Nicolas</span>
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-[--color-fg-2] md:text-xl">
            Known as <strong className="font-medium text-[--color-fg]">TzDev</strong>.
            I design <em className="font-serif italic">thumbnails</em> and logos, and code
            <strong className="font-medium text-[--color-fg]"> web apps, mobile apps and APIs</strong>
            end-to-end while building <strong className="font-medium text-[--color-fg]">Adventure AI</strong>.
            My work has driven <span className="text-[--color-fg]">500M+ YouTube views</span> for
            the world&apos;s biggest creators.
          </p>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href="#thumbnails"
              className="inline-flex items-center gap-2 rounded-full bg-[--color-fg] px-6 py-3 text-sm font-medium text-[--color-bg] transition-transform hover:-translate-y-0.5"
            >
              View work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[--color-border-strong] px-6 py-3 text-sm font-medium text-[--color-fg] transition-colors hover:bg-[--color-fg] hover:text-[--color-bg]"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-[--color-border] bg-[--color-bg-2] py-6">
        <div className="flex w-max marquee-track gap-4 pr-4">
          {[...strip, ...strip].map((file, i) => (
            <div
              key={`${file}-${i}`}
              className="relative h-32 w-56 shrink-0 overflow-hidden rounded-md bg-[--color-surface-2] ring-1 ring-black/5 md:h-40 md:w-72"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/thumbnails/${file}`}
                alt=""
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 divide-x divide-[--color-border] border-b border-[--color-border] md:grid-cols-4">
          {[
            { n: "500M+", l: "YouTube views" },
            { n: "130M+", l: "Subscribers reached" },
            { n: "20+", l: "Top-tier creators" },
            { n: "2", l: "Apps in the works" },
          ].map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col gap-2 py-8 ${i === 0 ? "pr-6" : "px-6"}`}
            >
              <span className="font-serif text-4xl leading-none text-[--color-fg] md:text-5xl">
                {s.n}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--color-muted]">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
