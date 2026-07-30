import Reveal from "./Reveal";

// The lead section of the thumbnails page: the method comes before the gallery,
// so the work reads as decisions rather than as a pile of images.
//
// The copy is deliberately written in short lines — each one is its own beat, and
// `em` marks the beats that land, which render in serif italic instead of body text.
type Line = { t: string; em?: boolean };

const steps: { n: string; title: string; lines: Line[] }[] = [
  {
    n: "01",
    title: "The Story",
    lines: [
      { t: "A thumbnail shouldn't explain the title." },
      { t: "It should complete it.", em: true },
      {
        t: "When someone reads the title and sees the thumbnail, their brain should instantly create a question that only clicking can answer.",
      },
    ],
  },
  {
    n: "02",
    title: "The Hook",
    lines: [
      { t: "The first seconds of the video matter just as much as the thumbnail." },
      {
        t: "If the opening doesn't immediately reinforce the promise made by the title and thumbnail, viewers leave.",
      },
      { t: "CTR gets the click.", em: true },
      { t: "The hook earns the watch time.", em: true },
    ],
  },
  {
    n: "03",
    title: "The Design",
    lines: [
      { t: "Every design choice should support the story." },
      { t: "Colors guide attention." },
      { t: "Composition controls what the eye sees first." },
      { t: "Expressions create emotion." },
      { t: "Nothing is random.", em: true },
    ],
  },
  {
    n: "04",
    title: "The Strategy",
    lines: [
      { t: "I don't copy what's already working." },
      { t: "I study what everyone else is doing, then look for the opportunity they're missing." },
      { t: "Sometimes the difference isn't a better design." },
      { t: "It's a better idea.", em: true },
    ],
  },
];

export default function Strategy({ index = "01" }: { index?: string }) {
  return (
    <section id="strategy" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Strategy</span>
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              A thumbnail is a <em className="italic">promise</em>
            </h2>
            <p className="max-w-md text-(--color-fg-2)">
              The image is only one piece of the puzzle. What actually drives clicks is{" "}
              <strong className="text-(--color-fg)">
                how the thumbnail, title, and opening hook work together
              </strong>
              .
            </p>
          </div>
        </div>
      </Reveal>

      <div className="border-t border-(--color-border)">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 80}>
            <article className="group grid grid-cols-1 gap-3 border-b border-(--color-border) py-8 transition-colors hover:bg-(--color-surface)/40 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-8 md:py-10">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-(--color-accent-warm)">
                {s.n}
              </span>
              <h3 className="font-serif text-3xl leading-tight tracking-tight text-(--color-fg) md:text-4xl">
                {s.title}
              </h3>
              <div className="max-w-2xl space-y-2.5">
                {s.lines.map((l) =>
                  l.em ? (
                    <p
                      key={l.t}
                      className="font-serif text-xl italic leading-snug text-(--color-fg) md:text-2xl"
                    >
                      {l.t}
                    </p>
                  ) : (
                    <p key={l.t} className="leading-relaxed text-(--color-fg-2)">
                      {l.t}
                    </p>
                  )
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-(--color-muted)">
            500M+ views · 100+ creators
          </p>
          <a
            href="#thumbnails"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--color-fg) px-6 py-3 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
          >
            See the work
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
