import Reveal from "./Reveal";

const items = [
  "Vibe Coding",
  "500M+ Views",
  "Adventure AI",
  "YouTube Thumbnails",
  "Landing Pages",
  "Web Apps",
  "Mobile Apps",
  "Branding",
  "Logos",
  "AI Products",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <Reveal>
      <div className="relative my-2 overflow-hidden border-y border-(--color-border) bg-(--color-bg-2) py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-(--color-bg) to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-(--color-bg) to-transparent"
        />
        <div className="flex w-max marquee-track--slow items-baseline gap-10 pr-10">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className={`inline-flex items-baseline gap-10 whitespace-nowrap text-5xl leading-none tracking-tight md:text-6xl ${
                i % 2 === 0
                  ? "font-serif italic text-(--color-fg-2)"
                  : "font-sans font-black uppercase text-(--color-fg)"
              }`}
            >
              {t}
              <span aria-hidden className="font-sans text-2xl not-italic text-(--color-accent-warm)">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
