import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-(--color-border)">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>(07)</span>
            <span>Contact</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-14 text-center text-(--color-fg)">
            <span className="block font-sans text-[11vw] font-black uppercase leading-[0.92] tracking-[-0.03em] md:text-[7.5rem] lg:text-[9rem]">
              Got an idea?
            </span>
            <span className="mt-2 block font-serif text-[10vw] italic leading-[1] tracking-[-0.02em] text-(--color-fg-2) md:text-[6.5rem] lg:text-[8rem]">
              Let&apos;s build it.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-lg text-center text-(--color-fg-2)">
            Hit me up for your logo, your thumbnail, your landing page — or your next product.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:matthew@adventuregen.ai"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-fg) px-7 py-3.5 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              matthew@adventuregen.ai
            </a>
            <a
              href="https://wa.me/5535991147978"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 bg-transparent px-5 py-3 text-sm font-medium text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634L2.05 21.483l3.604-1.29zM17.472 14.382c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://x.com/TzDev_"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 bg-transparent px-5 py-3 text-sm font-medium text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
            >
              Twitter / X
            </a>
            <a
              href="https://www.instagram.com/tzdev.ai/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 bg-transparent px-5 py-3 text-sm font-medium text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
            >
              Instagram
            </a>
            <a
              href="https://discord.com/users/tzdev"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 bg-transparent px-5 py-3 text-sm font-medium text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              tzdev
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
