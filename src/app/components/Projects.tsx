import Reveal from "./Reveal";

const cards = [
  {
    span: "lg:col-span-2",
    badge: "Flagship product",
    title: "Adventure AI",
    body: "AI platform for crafting interactive adventures and experiences. Combines storytelling, automation, and artificial intelligence into a single product.",
    tags: ["AI", "SaaS", "Web", "Next.js"],
    featured: true,
    url: "https://www.adventuregen.ai/",
  },
  {
    span: "",
    badge: "Apps",
    title: "Other applications",
    body: "Multiple apps in parallel — always testing new ideas.",
    tags: ["Mobile", "Web"],
  },
  {
    span: "",
    badge: "Design",
    title: "Thumbnails & Branding",
    body: "Full identity packages and thumbnails for creators and brands.",
    tags: ["Design", "Branding"],
  },
  {
    span: "lg:col-span-2",
    badge: "Landing Pages",
    title: "High-converting websites",
    body: "Landing pages and marketing sites built with Next.js and Tailwind — focused on speed, performance, and identity.",
    tags: ["Next.js", "Tailwind", "TypeScript", "Vercel"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-10 max-w-3xl">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[--color-muted]">
            — Building now
          </span>
          <h2 className="mt-4 font-serif text-5xl leading-[1] tracking-tight text-[--color-fg] md:text-6xl">
            Projects
          </h2>
          <p className="mt-4 max-w-xl text-[--color-fg-2]">
            What I&apos;m shipping at the moment.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} className={c.span} delay={i * 80}>
            <article
              className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-all hover:-translate-y-1 ${
                c.featured
                  ? "border-[--color-fg] bg-[--color-fg] text-[--color-bg] md:p-9"
                  : "border-[--color-border] bg-[--color-surface] text-[--color-fg] hover:border-[--color-fg] hover:shadow-[0_24px_60px_-30px_rgba(53,49,31,0.55)]"
              }`}
            >
              <span
                className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  c.featured
                    ? "border-[--color-bg]/30 text-[--color-bg]/85"
                    : "border-[--color-border-strong] text-[--color-muted]"
                }`}
              >
                {c.badge}
              </span>
              <h3
                className={`mt-5 font-serif leading-tight tracking-tight ${
                  c.featured ? "text-4xl md:text-5xl" : "text-3xl"
                }`}
              >
                {c.title}
              </h3>
              <p
                className={`mt-3 max-w-xl text-sm leading-relaxed ${
                  c.featured ? "text-[--color-bg]/80 md:text-base" : "text-[--color-fg-2]"
                }`}
              >
                {c.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                      c.featured
                        ? "bg-[--color-bg]/15 text-[--color-bg]"
                        : "bg-[--color-bg] text-[--color-fg-2]"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {c.featured && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[--color-bg] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[--color-fg] transition-transform hover:-translate-y-0.5"
                >
                  Visit adventuregen.ai
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
