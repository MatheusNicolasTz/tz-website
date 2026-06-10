export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-(--color-border)">
      <div className="mx-auto max-w-7xl px-6 pt-12 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 pb-10 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted) md:flex-row md:items-center">
          <p>
            © {year} <span className="text-(--color-fg)">TzDev</span> — Matheus Nicolas
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://wa.me/5535991147978"
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-(--color-fg)"
            >
              WhatsApp
            </a>
            <a href="https://x.com/TzDev_" target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-(--color-fg)">
              X
            </a>
            <a href="https://www.instagram.com/tzdev.ai/" target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-(--color-fg)">
              Instagram
            </a>
            <a href="#top" className="transition-colors hover:text-(--color-fg)">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-sans text-[24vw] font-black uppercase leading-[0.75] tracking-[-0.04em] text-[rgba(236,231,219,0.07)]"
      >
        TzDev
      </div>
    </footer>
  );
}
