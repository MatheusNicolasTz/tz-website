import Reveal from "./Reveal";

const clients = [
  { name: "Like Nastya", note: "130M+ subscribers" },
  { name: "Khalid Al Ameri", note: "Top MENA creator" },
  { name: "Corey Funk", note: "Action sports" },
  { name: "Koreannosh", note: "Lifestyle" },
  { name: "Hudson Matter", note: "Entertainment" },
];

export default function Clients() {
  return (
    <section id="clients" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>(04)</span>
            <span>Trusted by</span>
          </div>
          <h2 className="mt-8 font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
            Creators I&apos;ve <em className="italic">worked</em> with
          </h2>
          <p className="mt-4 max-w-xl text-(--color-fg-2)">
            <strong className="text-(--color-fg)">100+ clients</strong> served — from channels with millions of subscribers
            to billions of impressions, they trust my thumbnails to drive clicks.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) p-8 md:p-12">
          <div className="grid divide-y divide-(--color-border) md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-5">
            {clients.map((c, i) => (
              <div
                key={c.name}
                className={`group flex flex-col py-6 md:py-2 ${i === 0 ? "md:pl-0" : "md:pl-6"} ${
                  i < 2 ? "" : "lg:pl-6"
                } md:pr-6`}
              >
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-(--color-muted)">
                  Client
                </span>
                <span className="mt-3 font-serif text-2xl leading-tight text-(--color-fg)">
                  {c.name}
                </span>
                <span className="mt-1 text-xs text-(--color-fg-2)">{c.note}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
