"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { contacts, isExternal } from "./contacts";

// The closer: a question with two buttons where only one of them survives being
// clicked. "No" shatters, the page blames the visitor for clicking too hard, and
// the only door left open is the one that leads to my inbox.
//
// Delivery: the browser posts straight to Web3Forms, which mails INBOX. Nothing
// opens a mail client, so the visitor never leaves the page.
//
// This deliberately does NOT go through a route handler of ours. Web3Forms sits
// behind Cloudflare bot protection tuned for browser traffic, and a server-side
// fetch gets served a challenge page instead of the API. Their documented
// integration is this one, from the client.
//
// The key is therefore public, which is by design: it only ever authorises mail
// to the address it was issued for, so the worst it buys an abuser is spam in my
// own inbox. Hiding it would mean a provider built for server-side sending
// (Resend, Postmark), which needs DNS records on the domain.
//
// NEXT_PUBLIC_ values are inlined at build time: changing the key means a
// rebuild, not just a restart.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";
const INBOX = "contact@tzstrategist.com";

type Status = "idle" | "sending" | "sent" | "error";

// The three pieces "No" comes apart into. The polygons tile the whole button, so
// the shards read as one broken thing rather than three overlapping copies.
const shards = [
  { cls: "shard--a", clip: "polygon(0 0, 46% 0, 54% 100%, 0 100%)" },
  { cls: "shard--b", clip: "polygon(46% 0, 78% 0, 84% 100%, 54% 100%)" },
  { cls: "shard--c", clip: "polygon(78% 0, 100% 0, 100% 100%, 84% 100%)" },
];

export default function HireGate({ index = "07" }: { index?: string }) {
  const [broken, setBroken] = useState(false);
  const [shattered, setShattered] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // The pieces get their flight, and only once they have landed does the slot go
  // away and the punchline arrive. Leaving "Yes" alone in the middle is the joke;
  // pulling the button mid-animation would just look like a layout bug.
  useEffect(() => {
    if (!broken) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShattered(true), reduced ? 0 : 900);
    return () => clearTimeout(t);
  }, [broken]);

  const send = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!ACCESS_KEY) {
      setError("Sending isn't configured yet.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Someone said yes on the site",
          from_name: "Portfolio site",
          // Web3Forms sets Reply-To from this, so hitting reply in my mail
          // client answers whoever filled the form.
          email: data.get("email") ?? "",
          message: data.get("message") ?? "",
          // Hidden field only a bot would fill in; Web3Forms drops those.
          botcheck: data.get("botcheck") ?? "",
        }),
      });

      if (res.ok) {
        setStatus("sent");
        return;
      }
      setError("That didn't go through.");
      setStatus("error");
    } catch {
      setError("That didn't go through.");
      setStatus("error");
    }
  };

  return (
    <section id="hire" className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
      <Reveal>
        <div className="mb-12 border-t border-(--color-border) pt-6">
          <div className="flex items-baseline justify-between font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-(--color-muted)">
            <span>({index})</span>
            <span>One last thing</span>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-(--color-fg) md:text-7xl">
            So, are you <em className="italic">hiring</em> me?
          </h2>

          {!open && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full bg-(--color-fg) px-8 py-3.5 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5"
              >
                Yes
              </button>

              {/* While it is coming apart the button keeps its box, so the shards
                  break in place instead of the row reflowing under them. */}
              {!shattered && (
                <span className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setBroken(true)}
                    disabled={broken}
                    aria-label={broken ? "No (broken)" : "No"}
                    className={`rounded-full border border-(--color-fg)/30 px-8 py-3.5 text-sm font-medium text-(--color-fg) transition-colors ${
                      broken ? "invisible" : "hover:bg-(--color-fg) hover:text-(--color-bg)"
                    }`}
                  >
                    No
                  </button>

                  {broken &&
                    shards.map((s) => (
                      <span
                        key={s.cls}
                        aria-hidden
                        style={{ clipPath: s.clip }}
                        className={`shard ${s.cls} pointer-events-none absolute inset-0 flex items-center justify-center rounded-full border border-(--color-fg)/30 text-sm font-medium text-(--color-fg)`}
                      >
                        No
                      </span>
                    ))}
                </span>
              )}
            </div>
          )}

          {shattered && !open && (
            <p
              role="status"
              className="mt-8 font-serif text-2xl italic text-(--color-fg-2) md:text-3xl"
            >
              Looks like you clicked too hard. <span className="not-italic">😂</span>
            </p>
          )}

          {open && (
            <>
            {/* Saying yes gets answered in thumbnail language: the loudest thing
                on the page, pointing at the one field that matters. */}
            <div className="mt-8 flex flex-col items-center">
              <span className="thumb-slam thumb-caps font-sans text-6xl font-black uppercase leading-none tracking-[-0.02em] md:text-8xl">
                Hired?!
              </span>
              {/* Sized against the caps, not in absolute pixels: at text-8xl a
                  52px arrow reads as an afterthought. */}
              <svg
                aria-hidden
                viewBox="0 0 64 68"
                className="thumb-arrow mt-3 h-[54px] w-[51px] md:mt-4 md:h-[78px] md:w-[73px]"
              >
                <path
                  d="M24 4 H40 V36 H56 L32 64 L8 36 H24 Z"
                  fill="#e5342a"
                  stroke="#000"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-4 w-full max-w-lg text-left">
              {status === "sent" ? (
                <p
                  role="status"
                  className="text-center font-serif text-3xl italic text-(--color-fg) md:text-4xl"
                >
                  Sent. I&apos;ll reply from {INBOX}.
                </p>
              ) : (
                <form onSubmit={send} className="flex flex-col gap-3">
                  {/* No instruction line: the arrow above already points at the
                      first field, which is the whole point of an arrow. */}
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    aria-label="Your email"
                    className="rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-4 py-3 text-sm text-(--color-fg) placeholder:text-(--color-muted) focus:border-(--color-fg) focus:outline-none"
                  />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What's the video about?"
                    aria-label="Your message"
                    className="resize-y rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-4 py-3 text-sm text-(--color-fg) placeholder:text-(--color-muted) focus:border-(--color-fg) focus:outline-none"
                  />

                  {/* Honeypot: off-screen for people, irresistible to bots. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px]"
                    aria-hidden
                  />

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 rounded-full bg-(--color-fg) px-8 py-3.5 text-sm font-medium text-(--color-bg) transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send it"}
                  </button>

                  {status === "error" && (
                    <p role="alert" className="text-center text-sm text-(--color-accent-warm)">
                      {error} Mail me at {INBOX}.
                    </p>
                  )}
                </form>
              )}
            </div>
            </>
          )}

          {/* The only place on the site that lists these, which is why it sits
              outside the yes/no branch: nobody should have to play along with a
              joke to find an email address. The footer deliberately carries none
              of this, so the two cannot stack up and repeat each other. */}
          <div className="mt-12 w-full max-w-3xl border-t border-(--color-border) pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-muted)">
              Or reach me anywhere
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              {contacts.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  target={isExternal(c.href) ? "_blank" : undefined}
                  rel={isExternal(c.href) ? "noreferrer noopener" : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-(--color-fg)/30 px-4 py-2.5 text-sm font-medium text-(--color-fg) transition-colors hover:bg-(--color-fg) hover:text-(--color-bg)"
                >
                  {c.icon}
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
