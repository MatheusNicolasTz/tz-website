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
              <a
                href="https://discord.com/users/tzdev"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-[--color-bg]/40 bg-[--color-bg] px-5 py-3 text-sm font-medium text-[--color-fg] transition-transform hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                tzdev
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
