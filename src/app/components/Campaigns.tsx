import Image from "next/image";
import Reveal from "./Reveal";
import InstagramPosts from "./InstagramPosts";
import { igPosts, igProfile, postUrl, xPosts, compact } from "./adventure-posts";

// A wall of receipts, not a case study. Each tile is a cover, a view count and the
// hook as written. The strategy behind them is already stated in AdventureCase;
// repeating it here as a caption per post is what made this page feel heavy.
//
// adventure-posts.ts still carries `note`, `date`, `likes` and `reposts` for each
// post. Nothing renders them on purpose. They are there if a longer version of
// this section is ever wanted back.
//
// The X posts are a local cover plus a view count. The Instagram ones cannot be:
// Instagram shows a logged-out reader nothing, so there is no cover to cache and
// no public count to read. Those go through Instagram's own embed instead, which
// is why the second half of this section looks nothing like the first.
export default function Campaigns({ index = "02" }: { index?: string }) {
  return (
    <section id="campaigns" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">
      <Reveal>
        <div className="border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>Campaigns</span>
          </div>
          <div className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-6xl leading-[0.95] tracking-tight text-(--color-fg) md:text-8xl">
              The posts
            </h2>
            <p className="max-w-md text-(--color-fg-2)">
              Ten on X, written and shipped by me between January and June 2026. The counts are the
              ones X shows on the live post.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {xPosts.map((p, i) => (
          <Reveal key={p.id} delay={(i % 5) * 60}>
            <a
              href={postUrl(p.id)}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col gap-2.5"
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-(--color-surface-2) ring-1 ring-(--color-border) transition-all group-hover:ring-(--color-border-strong)">
                <Image
                  src={p.cover}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-2 left-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                  {compact(p.views)} views
                </span>
              </div>
              <p className="text-sm leading-snug text-(--color-fg-2) transition-colors group-hover:text-(--color-fg)">
                {p.hook}
              </p>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-14 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>Instagram</span>
            <a
              href={igProfile}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-(--color-fg)"
            >
              @adventuregen.ai
            </a>
          </div>
          <p className="mt-6 max-w-xl text-(--color-fg-2)">
            Same playbook on the company account:{" "}
            <strong className="text-(--color-fg)">40K followers from zero</strong> in under a year.
          </p>
        </div>
      </Reveal>

      <InstagramPosts posts={igPosts} />
    </section>
  );
}
