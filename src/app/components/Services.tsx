import Reveal from "./Reveal";

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6z" />
      </svg>
    ),
    title: "Logo Design",
    desc: "Modern, memorable visual identities for brands that actually want to stand out.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 18l-6-6 6-6M16 6l6 6-6 6M14 4l-4 16" />
      </svg>
    ),
    title: "Vibe Coding",
    desc: "I code apps and websites end-to-end — from idea to shipped product, fast and intentional with AI in the loop.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
    title: "YouTube Thumbnails",
    desc: "Click-driving thumbnails for serious creators. 500M+ views generated across top-tier channels.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "Landing Pages",
    desc: "High-converting pages. Fast, responsive, and designed to sell.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
    title: "Mobile Apps",
    desc: "Cross-platform iOS and Android apps. From wireframe to App Store — performant and polished.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
      </svg>
    ),
    title: "Backend & APIs",
    desc: "REST and serverless APIs, databases, auth, integrations — robust servers built to scale with the product.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-10 max-w-3xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[--color-muted]">
            — What I do
          </span>
          <h2 className="mt-4 font-serif text-5xl leading-[1] tracking-tight text-[--color-fg] md:text-6xl">
            Services
          </h2>
          <p className="mt-4 max-w-xl text-[--color-fg-2]">
            From idea to shipped product — design, code, and strategy.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-surface] p-7 transition-all hover:-translate-y-1 hover:border-[--color-fg] hover:shadow-[0_24px_60px_-30px_rgba(53,49,31,0.55)]">
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[--color-border-strong] bg-[--color-bg] text-[--color-fg]">
                  {s.icon}
                </div>
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-[--color-fg]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[--color-fg-2]">
                  {s.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
