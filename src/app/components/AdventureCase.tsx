import Reveal from "./Reveal";
import { compact, xTotals } from "./adventure-posts";

// The whole strategy pitch, in one section. It used to be two (a case study and a
// growth playbook) and it read as homework: three stat rows, twenty-odd lines of
// copy, the same claim made three times.
//
// The rule now is one line per idea. Four numbers, four plays, one link out. If a
// play needs a paragraph to land, it is the wrong play.
const metrics = [
  { value: "49K", label: "Users" },
  { value: "40K", label: "Instagram, from zero" },
  { value: compact(xTotals.views), label: "Views on 10 posts" },
  { value: "< 1 year", label: "Start to now" },
];

const plays = [
  {
    n: "01",
    title: "Sell the feature, not the company",
    line: "Every post opens on the result. The logo is never the hook.",
  },
  {
    n: "02",
    title: "Put the link behind a comment",
    line: "Comment 4K. Comment Relight. The friction is the funnel.",
  },
  {
    n: "03",
    title: "Name the tool they already use",
    line: "Nobody can judge a tool they have never seen. They can judge a comparison.",
  },
  {
    n: "04",
    title: "Repeat the winner until it stops",
    line: "Relight went out five times. The version with three words of copy won.",
  },
];

export default function AdventureCase({ index = "01" }: { index?: string }) {
  return (
    <section id="adventure" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Adventure AI</span>
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              The product <em className="italic">and</em> the demand
            </h2>
            <p className="max-w-md text-(--color-fg-2)">
              My own product, an <strong className="text-(--color-fg)">NVIDIA Inception</strong>{" "}
              member. I decide what ships, I design it, and I run the campaigns that sell it.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-10 grid grid-cols-2 gap-8 border-y border-(--color-border) py-10 sm:gap-6 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-2">
              <span className="font-sans text-4xl font-black leading-none tracking-[-0.03em] text-(--color-fg) md:text-6xl">
                {m.value}
              </span>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
        {plays.map((p, i) => (
          <Reveal key={p.n} delay={i * 70}>
            <div className="flex gap-4">
              <span className="pt-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-(--color-accent-warm)">
                {p.n}
              </span>
              <div>
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-(--color-fg) md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-(--color-fg-2)">{p.line}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <a
          href="https://www.adventuregen.ai/"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-(--color-fg) px-6 py-3 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
        >
          See the product
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
