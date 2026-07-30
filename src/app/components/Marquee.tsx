import Reveal from "./Reveal";

// Keep every list EVEN. The track scrolls to translateX(-50%), so the second copy
// has to look identical to the first for the loop to be seamless — and the styling
// below alternates on index, which an odd count flips on the second pass.
//
// Ordering matters too: serif italic lands on even indices, heavy uppercase on odd.
const items = {
  dev: [
    "Web Apps",
    "Mobile Apps",
    "Landing Pages",
    "Adventure AI",
    "Integrations",
    "Logos",
    "Branding",
    "AI Products",
  ],
  thumbnails: [
    "Thumbnails",
    "500M+ Views",
    "Titles",
    "CTR",
    "Hooks",
    "100+ Creators",
    "Packaging",
    "Strategy",
  ],
};

export default function Marquee({ mode = "dev" }: { mode?: "dev" | "thumbnails" }) {
  const row = [...items[mode], ...items[mode]];
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
