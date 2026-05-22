import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[--color-muted]">
              — About
            </span>
            <h2 className="mt-4 font-serif text-5xl leading-[1] tracking-tight text-[--color-fg] md:text-6xl">
              Building at the speed of <em className="italic">curiosity</em>.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-5 text-lg leading-relaxed text-[--color-fg-2]">
            <p>
              I&apos;m <strong className="text-[--color-fg]">Matheus Nicolas</strong>, but you can call me{" "}
              <strong className="text-[--color-fg]">TzDev</strong>. I&apos;m <strong className="text-[--color-fg]">23</strong> and
              I mix design and code to turn ideas into real products.
            </p>
            <p>
              My thumbnails have driven over <strong className="text-[--color-fg]">500M YouTube views</strong> for top creators
              including <strong className="text-[--color-fg]">Like Nastya (150M+ subscribers)</strong>, Khalid Al Ameri,
              Corey Funk, Koreannosh, and Hudson Matter.
            </p>
            <p>
              Right now I&apos;m building <strong className="text-[--color-fg]">Adventure AI</strong> and shipping
              <strong className="text-[--color-fg]"> web apps, mobile apps, APIs and backend servers</strong> end-to-end —
              alongside thumbnails, logos and landing pages in <em className="font-serif italic text-[--color-fg]">vibe coding</em>
              mode — fast, intentional, and with identity.
            </p>
            <p>
              On the AI side, I <strong className="text-[--color-fg]">fine-tune pre-trained models</strong> and run
              advanced workflows in <strong className="text-[--color-fg]">ComfyUI</strong> — building custom pipelines for
              image generation, identity and style transfer.
            </p>
            <p>
              Good product is the sum of aesthetics, performance, and story.
            </p>
            <p className="border-l-2 border-[--color-fg] pl-4 font-serif text-2xl italic leading-snug text-[--color-fg] md:text-3xl">
              The dream? Build a <span className="not-italic">🦄</span> unicorn startup from scratch.
            </p>

            <div className="mt-8 flex flex-wrap gap-2 pt-2">
              {["Next.js", "React", "TypeScript", "Tailwind", "React Native", "Node.js", "REST APIs", "PostgreSQL", "AI / Fine-tuning", "ComfyUI", "Figma", "Illustrator", "Design", "Branding"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[--color-border-strong] bg-[--color-surface] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[--color-fg-2]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
