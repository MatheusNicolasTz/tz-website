export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-[--color-border] px-6 py-10 text-center text-sm text-[--color-muted]">
      <p>
        © {year} <span className="text-[--color-fg] font-semibold">TzDev</span> — Matheus Nicolas.
      </p>
    </footer>
  );
}
