"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#thumbnails", label: "Thumbnails" },
  { href: "#clients", label: "Clients" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-(--color-fg)"
          aria-label="TzDev — home"
        >
          <Image
            src="/logo.png"
            alt="TzDev"
            width={36}
            height={36}
            priority
            className="h-9 w-9 object-contain"
          />
          <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-(--color-muted) sm:inline">
            TzDev
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-muted) transition-colors hover:text-(--color-fg)"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-(--color-fg) px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-(--color-bg) transition-transform hover:-translate-y-px"
        >
          Let&apos;s chat
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden flex items-center justify-center rounded-full border border-(--color-border-strong) p-2 text-(--color-fg)"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-(--color-border) bg-(--color-bg)/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {[...links, { href: "#contact", label: "Contact" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-mono text-xs uppercase tracking-[0.18em] text-(--color-fg-2) hover:bg-(--color-surface)"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
