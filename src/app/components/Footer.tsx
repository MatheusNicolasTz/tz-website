export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-(--color-border)">
      <div className="mx-auto max-w-7xl px-6 pt-12 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 pb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted) md:flex-row md:items-center">
          <p>
            © {year} <span className="text-(--color-fg)">Matthew</span>
          </p>
          {/* No contact links here on purpose. HireGate sits directly above this
              footer and lists every channel with the real handle attached, so a
              second short-labelled copy landed a few pixels below the first and
              read as a mistake. */}
          <a href="#top" className="transition-colors hover:text-(--color-fg)">
            Back to top ↑
          </a>
        </div>
      </div>
      {/* The size is tuned to the word: 24vw fit "TzDev" at five letters and
          clipped the last letter of a seven-letter one, since the footer hides
          its overflow. Re-measure this if the name ever changes length. */}
      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-sans text-[17vw] font-black uppercase leading-[0.75] tracking-[-0.04em] text-[rgba(236,231,219,0.07)]"
      >
        Matthew
      </div>
    </footer>
  );
}
