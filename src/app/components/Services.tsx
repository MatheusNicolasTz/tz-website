import Reveal from "./Reveal";

// The build side of the studio. Thumbnails are not listed here on purpose — they
// get their own page rather than a card in a grid.
const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M8 18l-6-6 6-6M16 6l6 6-6 6M14 4l-4 16" />
      </svg>
    ),
    title: "Web Apps",
    desc: "I code apps and websites end-to-end — from idea to shipped product, fast and intentional.",
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
        <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1 3-6z" />
      </svg>
    ),
    title: "Logo & Identity",
    desc: "Modern, memorable visual identities for brands that actually want to stand out.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M17.5 19a4.5 4.5 0 1 0-.9-8.9 6 6 0 0 0-11.4 1.8A3.5 3.5 0 0 0 6 19h11.5z" />
      </svg>
    ),
    title: "Cloud & Integrations",
    desc: "Google Cloud, third-party APIs, auth, payments — I wire everything together so the product just works.",
  },
];

export default function Services({ index = "01" }: { index?: string }) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>What I do</span>
          </div>
          <h2 className="mt-8 font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
            Services
          </h2>
          <p className="mt-5 max-w-xl text-(--color-fg-2)">
            From idea to shipped product — web, mobile, backend, and the brand around it.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) p-7 transition-all hover:-translate-y-1 hover:border-(--color-border-strong) hover:bg-(--color-surface-2)">
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-(--color-border-strong) bg-(--color-bg) text-(--color-fg)">
                  {s.icon}
                </div>
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-(--color-fg)">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-fg-2)">
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
