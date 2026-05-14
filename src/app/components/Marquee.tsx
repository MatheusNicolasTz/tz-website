import Reveal from "./Reveal";

const items = [
  "Vibe Coding",
  "500M+ Views",
  "Adventure AI",
  "Like Nastya",
  "Khalid Al Ameri",
  "Corey Funk",
  "Koreannosh",
  "Hudson Matter",
  "YouTube Thumbnails",
  "Landing Pages",
  "Web Apps",
  "Mobile Apps",
  "APIs",
  "Backend",
  "Logos",
  "Branding",
  "Next.js",
  "AI Products",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <Reveal>
      <div className="relative my-2 overflow-hidden border-y border-[--color-border] bg-[--color-surface-2] py-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[--color-bg] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[--color-bg] to-transparent"
        />
        <div className="flex w-max marquee-track gap-12 pr-12">
          {row.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-[--color-muted]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[--color-fg]" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
