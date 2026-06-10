export default function Background() {
  return (
    <>
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(217,140,95,0.08), transparent 60%), radial-gradient(ellipse 60% 40% at 85% 110%, rgba(179,169,143,0.06), transparent 60%)",
        }}
      />
      {/* Film grain */}
      <div aria-hidden className="grain" />
    </>
  );
}
