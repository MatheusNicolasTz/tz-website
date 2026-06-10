import Image from "next/image";
import Reveal from "./Reveal";

type Shot = {
  file: string;
  alt: string;
  index: string;
  label: string;
  caption: string;
  span: string;
  sizes: string;
  feature?: boolean;
};

// Layout: 6-col bento, fixed row height. Row 1+2: feature (4×2) + two stacked (2×1).
// Row 3: two halves (3×1 each). All cells line up — no overflow, no gaps.
const shots: Shot[] = [
  {
    file: "adv-wall-purple.webp",
    alt: "Adventure AI logo on a purple studio wall",
    index: "01",
    label: "Studio wall",
    caption: "Window light · long shadow",
    span: "col-span-2 md:col-span-4 md:row-span-2",
    sizes: "(max-width: 768px) 100vw, 66vw",
    feature: true,
  },
  {
    file: "adv-billboard.webp",
    alt: "Adventure AI billboard mockup outdoors",
    index: "02",
    label: "Billboard",
    caption: "Out-of-home · scale test",
    span: "md:col-span-2",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
  {
    file: "adv-surface.webp",
    alt: "Adventure AI logo mockup",
    index: "03",
    label: "Surface study",
    caption: "Texture · light reflection",
    span: "md:col-span-2",
    sizes: "(max-width: 768px) 50vw, 33vw",
  },
  {
    file: "adv-card.webp",
    alt: "Adventure AI business card mockup",
    index: "04",
    label: "Business card",
    caption: "Print collateral · embossed mark",
    span: "md:col-span-3",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    file: "adv-mark.webp",
    alt: "Adventure AI logo presentation",
    index: "05",
    label: "Mark study",
    caption: "Identity · geometric system",
    span: "md:col-span-3",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
];

export default function AdventureBrand() {
  return (
    <section id="brand" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>(03)</span>
            <span>Brand identity</span>
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              A mountain that reads <em className="italic">A</em>
            </h2>
            <p className="max-w-md text-(--color-fg-2)">
              The <strong className="text-(--color-fg)">Adventure AI</strong> mark started from one
              simple idea: a mountain shaped like an <strong className="text-(--color-fg)">A</strong>.
              I designed the logo and carried it across the whole identity.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-4 flex items-end justify-between border-b border-(--color-border) pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-muted)">
          <span>Gallery / {String(shots.length).padStart(2, "0")} pieces</span>
          <span className="hidden sm:inline">Mark · object · environment</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:auto-rows-[14rem] md:gap-4">
        {shots.map((s, i) => (
          <Reveal key={s.file} delay={i * 70} className={`${s.span} h-full`}>
            <figure
              className={`group relative ${
                s.feature ? "aspect-[4/3]" : "aspect-square"
              } md:aspect-auto h-full w-full overflow-hidden rounded-md bg-(--color-surface-2) ring-1 ring-(--color-border)`}
            >
              <Image
                src={`/tz/logo-adv/${s.file}`}
                alt={s.alt}
                fill
                sizes={s.sizes}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-95 transition-opacity duration-500"
                aria-hidden
              />

              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-fg) backdrop-blur-sm">
                <span className="text-(--color-accent-warm)">·</span>
                {s.index}
              </span>

              <figcaption
                className={`absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-(--color-fg) ${
                  s.feature ? "md:p-6" : "md:p-5"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-(--color-fg-2)">
                  {s.label}
                </span>
                <span
                  className={`font-serif leading-tight ${
                    s.feature ? "text-2xl md:text-3xl" : "text-base md:text-lg"
                  }`}
                >
                  {s.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
