import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[--color-fg] bg-[--color-fg] p-10 text-center text-[--color-bg] md:p-16">
          <div className="relative">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[--color-bg]/70">
              — Contact
            </span>
            <h2 className="mt-4 font-serif text-5xl leading-[1] tracking-tight md:text-6xl">
              Got an idea?<br /><em className="italic">Let&apos;s build it.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[--color-bg]/75">
              Hit me up for your logo, your thumbnail, your landing page — or your next product.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:matthew@adventuregen.ai"
                className="inline-flex items-center gap-2 rounded-full bg-[--color-bg] px-6 py-3 text-sm font-medium text-[--color-fg] transition-transform hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                matthew@adventuregen.ai
              </a>
              <a
                href="https://x.com/TzDev_"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-[--color-bg]/40 bg-transparent px-5 py-3 text-sm font-medium text-[--color-bg] transition-colors hover:bg-[--color-bg] hover:text-[--color-fg]"
              >
                Twitter / X
              </a>
              <a
                href="https://www.instagram.com/tzdev.ai/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-[--color-bg]/40 bg-transparent px-5 py-3 text-sm font-medium text-[--color-bg] transition-colors hover:bg-[--color-bg] hover:text-[--color-fg]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
