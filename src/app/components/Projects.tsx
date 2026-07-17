import Image from "next/image";
import Reveal from "./Reveal";

const cards = [
  {
    span: "lg:col-span-2",
    badge: "Flagship product",
    title: "Adventure AI",
    featured: true,
    url: "https://www.adventuregen.ai/",
    img: "/projects/adventure-ai.webp",
    hoverNote: "Founder — I built the product, the brand and the code.",
    badgeNote: "NVIDIA Inception member",
  },
  {
    span: "",
    badge: "Mobile app",
    title: "Motoriza",
    url: "https://www.motorizacnh.com/",
    img: "/projects/motoriza.webp",
    hoverNote: "Designed and built end-to-end — app and landing page.",
  },
  {
    span: "",
    badge: "Agency site",
    title: "Adventure Studio",
    url: "https://www.adventurectr.com/",
    img: "/projects/adventure-studio.webp",
    hoverNote: "The studio's own site — design, copy and code.",
  },
  {
    span: "",
    badge: "Client portfolio",
    title: "Lowl — Harrison",
    url: "https://lowl-portfolio.vercel.app/",
    img: "/projects/lowl.webp",
    hoverNote: "Designed and coded for thumbnail designer Harrison.",
  },
  {
    span: "",
    badge: "Client portfolio",
    title: "VivianPSD",
    url: "https://www.vivianpsd.com/",
    img: "/projects/vivianpsd.webp",
    hoverNote: "Designed and shipped for thumbnail designer Vivian.",
  },
];

function cardHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export default function Projects({ index = "05" }: { index?: string }) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Shipped &amp; shipping</span>
          </div>
          <h2 className="mt-8 font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
            Projects
          </h2>
          <p className="mt-4 max-w-xl text-(--color-fg-2)">
            Products and sites I&apos;ve built — live on the internet. Hover to see my role.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} className={c.span} delay={i * 80}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) text-(--color-fg) transition-all hover:-translate-y-1 hover:border-(--color-border-strong) hover:bg-(--color-surface-2)"
            >
              <div className="relative aspect-[16/9] flex-1 overflow-hidden">
                <Image
                  src={c.img}
                  alt={`${c.title} — website preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:blur-[2px]"
                />

                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-white/15 bg-black/45 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    {c.badge}
                  </span>
                  {c.badgeNote && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#76b900]/50 bg-black/45 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#76b900] backdrop-blur-sm">
                      <span className="h-1 w-1 rounded-full bg-[#76b900]" />
                      {c.badgeNote}
                    </span>
                  )}
                </div>

                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-400 group-hover:bg-black/70" />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-8 text-center">
                  <span className="translate-y-1 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-(--color-accent-warm) opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    My role
                  </span>
                  <span
                    className={`translate-y-1 font-serif italic leading-snug text-white opacity-0 transition-all delay-75 duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 ${
                      c.featured ? "max-w-lg text-2xl md:text-3xl" : "text-lg md:text-xl"
                    }`}
                  >
                    {c.hoverNote}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="min-w-0">
                  <h3
                    className={`truncate font-serif leading-tight tracking-tight ${
                      c.featured ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-(--color-muted)">
                    {cardHost(c.url)}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
