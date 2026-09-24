import Reveal from "./Reveal";

// The opening claim of the strategy page: the creative is not the job, the system
// around it is. Everything under this section is that claim being proved on one
// product, so this is the only place it gets stated. Do not restate it in
// AdventureCase.
//
// Deliberately not a numbered grid. AdventureCase already runs four numbered
// plays, and two four-item lists back to back read as one long list. These four
// are a strip: a label, one line, no numbers, divided by a rule instead of boxed.
const beats: { label: string; line: string }[] = [
  { label: "Hook", line: "Gets the attention." },
  { label: "Retention", line: "Keeps it." },
  { label: "Timing", line: "Decides whether the idea reaches the right people at the right moment." },
  { label: "Execution", line: "Makes the message clear on sight." },
];

export default function Approach({ index = "01" }: { index?: string }) {
  return (
    <section id="approach" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Approach</span>
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              More than the <em className="italic">creative</em>
            </h2>
            <p className="max-w-md text-(--color-fg-2)">
              A creative is never an isolated design. It&apos;s{" "}
              <strong className="text-(--color-fg)">
                one part of a system that has to earn attention and turn it into action
              </strong>
              .
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-y-8 border-y border-(--color-border) py-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-0">
        {beats.map((b, i) => (
          <Reveal key={b.label} delay={i * 70}>
            <div
              className={
                // Not `lg:first:`: each item is wrapped in a Reveal, so the div is
                // never the grid's first child and the variant would never match.
                i === 0 ? "h-full" : "h-full lg:border-l lg:border-(--color-border) lg:pl-6"
              }
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-(--color-accent-warm)">
                {b.label}
              </span>
              <p className="mt-3 max-w-xs font-serif text-2xl leading-snug tracking-tight text-(--color-fg) md:text-[1.75rem]">
                {b.line}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <p className="mt-10 max-w-3xl font-serif text-2xl italic leading-snug text-(--color-fg-2) md:text-3xl">
          So I don&apos;t stop at the design. I think about the entire journey around it, and what
          follows is that journey run on one product: my own.
        </p>
      </Reveal>
    </section>
  );
}
