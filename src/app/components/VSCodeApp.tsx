"use client";

// The VS Code window of the desktop: an Explorer that really navigates, case studies instead of placeholder code,
// a browser-style preview, and a terminal that reports on the open file. Content lives in workspace-data.ts.
import Image from "next/image";
import { Inter, JetBrains_Mono } from "next/font/google";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { contacts, isExternal } from "./contacts";
import {
  contactTerminal, experience, fileName, projects, readme, skills, tree,
  type CaseStudy, type FileId, type Media, type TreeItem,
} from "./workspace-data";
import "./vscode.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

type Size = "wide" | "medium" | "compact";
type PanelState = "open" | "collapsed" | "max";

const projectBySlug = new Map(projects.map((p) => [p.slug, p]));
const external = { target: "_blank", rel: "noreferrer noopener" } as const;

// ───────────────────────── icons ─────────────────────────
type IconName = "files" | "search" | "branch" | "run" | "extensions" | "account" | "settings" | "chevron" | "close"
  | "split" | "expand" | "external" | "lock" | "back" | "forward" | "reload" | "menu" | "check" | "warn" | "error"
  | "maximize" | "minimize" | "play" | "arrow" | "bell";
function Icon({ name }: { name: IconName }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    {name === "files" && <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></>}
    {name === "search" && <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>}
    {name === "branch" && <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="8" r="2" /><path d="M6 7v10M18 10c0 4-6 3-11 7" /></>}
    {name === "run" && <><path d="M7 4v16l13-8z" /></>}
    {name === "extensions" && <><rect x="4" y="4" width="7" height="7" rx="1.2" /><rect x="4" y="13" width="7" height="7" rx="1.2" /><rect x="13" y="13" width="7" height="7" rx="1.2" /><path d="m14.5 6.5 3-3 3 3-3 3z" /></>}
    {name === "account" && <><circle cx="12" cy="9" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>}
    {name === "settings" && <><circle cx="12" cy="12" r="3" /><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M5.6 18.4 7 17m10-10 1.4-1.4" /></>}
    {name === "chevron" && <path d="m9 6 6 6-6 6" />}
    {name === "close" && <path d="M6 6l12 12M18 6 6 18" />}
    {name === "split" && <><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" /><path d="M12 4.5v15" /></>}
    {name === "expand" && <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />}
    {name === "external" && <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>}
    {name === "lock" && <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>}
    {name === "back" && <path d="M15 6l-6 6 6 6" />}
    {name === "forward" && <path d="m9 6 6 6-6 6" />}
    {name === "reload" && <><path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v5h-5" /></>}
    {name === "menu" && <path d="M4 7h16M4 12h16M4 17h16" />}
    {name === "check" && <path d="m5 12.5 4.5 4.5L19 7.5" />}
    {name === "warn" && <><path d="M12 4 2.8 19.5h18.4z" /><path d="M12 10v4.5M12 17.2v.3" /></>}
    {name === "error" && <><circle cx="12" cy="12" r="8.5" /><path d="m9 9 6 6m0-6-6 6" /></>}
    {name === "maximize" && <path d="m6 15 6-6 6 6" />}
    {name === "minimize" && <path d="m6 9 6 6 6-6" />}
    {name === "play" && <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />}
    {name === "arrow" && <path d="M5 12h14m-5-5 5 5-5 5" />}
    {name === "bell" && <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>}
  </svg>;
}

function FileIcon({ kind }: { kind: TreeItem["kind"] }) {
  if (kind === "tsx") return <svg className="vsc-ficon vsc-ficon--tsx" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.3"><ellipse cx="12" cy="12" rx="9.5" ry="3.8" /><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" /></g><circle cx="12" cy="12" r="1.7" fill="currentColor" /></svg>;
  if (kind === "json") return <span className="vsc-ficon vsc-ficon--json" aria-hidden="true">{"{}"}</span>;
  return <span className="vsc-ficon vsc-ficon--md" aria-hidden="true">M↓</span>;
}

// ───────────────────────── hooks ─────────────────────────
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function useSize(ref: React.RefObject<HTMLElement | null>): Size {
  const [size, setSize] = useState<Size>("wide");
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // side preview only when the editor keeps ~480px for the case study (activity bar + explorer take ~280px)
    const measure = (w: number) => setSize(w >= 1100 ? "wide" : w >= 700 ? "medium" : "compact");
    measure(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => { const mq = window.matchMedia(motionQuery); mq.addEventListener("change", notify); return () => mq.removeEventListener("change", notify); },
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

// ───────────────────────── media ─────────────────────────
function MediaView({ media, large = false, controls = false }: { media: Media; large?: boolean; controls?: boolean }) {
  if (media.kind === "video") {
    return controls
      ? <video key={media.src} src={media.src} poster={media.poster} controls playsInline preload="none" aria-label={media.label} />
      : <video key={media.src} src={media.src} poster={media.poster} autoPlay muted loop playsInline preload="metadata" aria-label={media.label} />;
  }
  return <Image key={media.src} src={media.src} alt={media.label} fill sizes={large ? "90vw" : "(max-width: 960px) 92vw, 520px"} style={{ objectFit: media.fit ?? "cover", objectPosition: "top center" }} />;
}

function ratioNumber(ratio = "16 / 10") {
  const [w, h] = ratio.split("/").map(Number);
  return w && h ? w / h : 1.6;
}

function Lightbox({ items, index, onIndex, onClose }: { items: Media[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const media = items[index];
  useEffect(() => {
    // capture phase: Escape closes only the lightbox, not the whole VS Code window (Desktop listens to Escape too)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.stopImmediatePropagation(); onClose(); }
      if (event.key === "ArrowRight" && items.length > 1) onIndex((index + 1) % items.length);
      if (event.key === "ArrowLeft" && items.length > 1) onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [index, items.length, onClose, onIndex]);
  return <div className="vsc-lightbox" role="dialog" aria-label={`${media.label} — expanded preview`} onClick={onClose}>
    <div className="vsc-lightbox-frame" style={{ aspectRatio: media.ratio ?? "16 / 10", ["--ar" as string]: ratioNumber(media.ratio) }} onClick={(e) => e.stopPropagation()}>
      <MediaView media={media} large controls={media.kind === "video" && !!media.sound} />
    </div>
    <div className="vsc-lightbox-bar" onClick={(e) => e.stopPropagation()}>
      {items.length > 1 && <button aria-label="Previous" onClick={() => onIndex((index - 1 + items.length) % items.length)}><Icon name="back" /></button>}
      <span>{media.label}{items.length > 1 && <em>{index + 1} / {items.length}</em>}</span>
      {items.length > 1 && <button aria-label="Next" onClick={() => onIndex((index + 1) % items.length)}><Icon name="forward" /></button>}
      <button className="vsc-lightbox-close" aria-label="Close preview" onClick={onClose}><Icon name="close" /></button>
    </div>
  </div>;
}

// ───────────────────────── preview (browser) ─────────────────────────
function Browser({ project, index, onIndex, onExpand, inline = false }: { project: CaseStudy; index: number; onIndex: (i: number) => void; onExpand: () => void; inline?: boolean }) {
  const media = project.media[index] ?? project.media[0];
  const address = project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return <section className={`vsc-browser ${inline ? "vsc-browser--inline" : ""}`} aria-label={`${project.name} preview`}>
    <div className="vsc-browser-bar">
      <span className="vsc-browser-nav" aria-hidden="true"><Icon name="back" /><Icon name="forward" /><Icon name="reload" /></span>
      <a className="vsc-address" href={project.url} {...external} title={`Open ${project.url}`}><Icon name="lock" /><span>{address}</span></a>
      <button className="vsc-icon-btn" onClick={onExpand} aria-label="Expand preview" title="Expand preview"><Icon name="expand" /></button>
      <a className="vsc-icon-btn" href={project.url} {...external} aria-label={`Open ${project.name} in a new tab`} title="Open the original"><Icon name="external" /></a>
    </div>
    <button className="vsc-browser-view" style={{ aspectRatio: media.ratio ?? "16 / 10" }} onClick={onExpand} aria-label={`Expand ${media.label}`}>
      <span className="vsc-browser-media" key={`${project.slug}-${index}`}><MediaView media={media} /></span>
    </button>
    {project.media.length > 1 && <div className="vsc-browser-strip" role="tablist" aria-label="Screens">
      {project.media.map((m, i) => <button key={m.src} role="tab" aria-selected={i === index} className={i === index ? "is-active" : ""} onClick={() => onIndex(i)}>
        {m.kind === "video" && <Icon name="play" />}{m.label}
      </button>)}
    </div>}
  </section>;
}

// ───────────────────────── editor views ─────────────────────────
function H2({ children }: { children: ReactNode }) {
  return <h2 className="vsc-h2"><span aria-hidden="true">##</span>{children}</h2>;
}

function ReadmeView({ open, onContact }: { open: (id: FileId) => void; onContact?: () => void }) {
  return <article className="vsc-doc vsc-readme">
    <header className="vsc-readme-hero">
      <p className="vsc-readme-hello">{readme.hello}</p>
      <h1>{readme.role}</h1>
      <p className="vsc-readme-line">{readme.line}</p>
      <p className="vsc-readme-about">{readme.about}</p>
      <div className="vsc-actions">
        <button className="vsc-btn vsc-btn--primary" onClick={() => open(projects[0].slug)}>Explore projects <Icon name="arrow" /></button>
        <button className="vsc-btn" onClick={() => open("experience")}>About me</button>
        <button className="vsc-btn" onClick={() => (onContact ? onContact() : open("contact"))}>Contact</button>
      </div>
    </header>
    <div className="vsc-metrics vsc-metrics--3">
      {readme.stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
    </div>
    <section>
      <H2>Projects</H2>
      <ul className="vsc-project-list">
        {projects.map((p) => <li key={p.slug}><button onClick={() => open(p.slug)}>
          <span className="vsc-project-index">{p.index}</span>
          <span className="vsc-project-name">{p.name}{p.featured && <em>Featured</em>}</span>
          <span className="vsc-project-cat">{p.category}</span>
          <span className="vsc-project-status"><i />{p.status}</span>
          <Icon name="chevron" />
        </button></li>)}
      </ul>
    </section>
  </article>;
}

function camel(slug: string) {
  return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/** The case study as real source: generated from the same data, so it never drifts from what's on screen. */
function SourceView({ project }: { project: CaseStudy }) {
  const s = (v: string) => <span className="tk-str">&quot;{v}&quot;</span>;
  const k = (v: string) => <span className="tk-key">{v}</span>;
  const lines: ReactNode[] = [
    <><span className="tk-com">{`// ${project.file} — rendered as a case study in the editor`}</span></>,
    <><span className="tk-kw">import</span> {"{"} <span className="tk-type">CaseStudy</span> {"}"} <span className="tk-kw">from</span> {s("../workspace")};</>,
    null,
    <><span className="tk-kw">export const</span> <span className="tk-fn">{camel(project.slug)}</span> = {"{"}</>,
    <>  {k("name")}: {s(project.name)},</>,
    <>  {k("category")}: {s(project.category)},</>,
    <>  {k("status")}: {s(project.status)},</>,
    <>  {k("url")}: {s(project.url)},</>,
    <>  {k("tags")}: [{project.tags.map((t, i) => <span key={t}>{i > 0 && ", "}{s(t)}</span>)}],</>,
    ...(project.metrics.length ? [<>  {k("metrics")}: [</>, ...project.metrics.map((m) => <>    {"{"} {k("value")}: {s(m.value)}, {k("label")}: {s(m.label)} {"}"},</>), <>  ],</>] : []),
    <>  {k("stack")}: [{project.stack.map((t, i) => <span key={t}>{i > 0 && ", "}{s(t)}</span>)}],</>,
    <>{"}"} <span className="tk-kw">satisfies</span> <span className="tk-type">CaseStudy</span>;</>,
  ];
  return <pre className="vsc-source"><code>{lines.map((line, i) => <span className="vsc-source-line" key={i}><span className="vsc-ln">{i + 1}</span><span>{line}</span></span>)}</code></pre>;
}

function ProjectView({ project, inlinePreview, open }: { project: CaseStudy; inlinePreview: ReactNode; open: (id: FileId) => void }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const [primary, ...more] = project.links;
  return <article className="vsc-doc vsc-case">
    <header className="vsc-case-head">
      <p className="vsc-kicker"><span>{project.index}</span>{project.featured ? "Featured project" : project.category}</p>
      <h1>{project.name}</h1>
      <p className="vsc-case-tagline">{project.tagline}</p>
      <div className="vsc-chips">
        <span className="vsc-status"><i />{project.status}</span>
        {project.tags.map((t) => <span className="vsc-chip" key={t}>{t}</span>)}
      </div>
      <div className="vsc-actions">
        <a className="vsc-btn vsc-btn--primary" href={primary.href} {...external}>{primary.label} <Icon name="external" /></a>
        {more.map((l) => <a key={l.href} className="vsc-btn" href={l.href} {...external}>{l.label}</a>)}
      </div>
    </header>

    {project.metrics.length > 0 && <div className={`vsc-metrics vsc-metrics--${project.metrics.length}`}>
      {project.metrics.map((m) => <div key={m.label}><strong>{m.value}</strong><span>{m.label}</span></div>)}
    </div>}

    {inlinePreview}

    <section>
      <H2>About the project</H2>
      <dl className="vsc-facts">
        <div><dt>Problem</dt><dd>{project.problem}</dd></div>
        <div><dt>What I built</dt><dd>{project.built}</dd></div>
        <div><dt>My role</dt><dd>{project.role}</dd></div>
      </dl>
    </section>

    <section>
      <H2>Stack & workflows</H2>
      <div className="vsc-chips">{project.stack.map((t) => <span className="vsc-chip vsc-chip--mono" key={t}>{t}</span>)}</div>
    </section>

    <section>
      <H2>Key features</H2>
      <ul className="vsc-features">{project.features.map((f) => <li key={f.title}><strong>{f.title}</strong><span>{f.text}</span></li>)}</ul>
    </section>

    {project.conversation && <section>
      <H2>How a session goes</H2>
      <div className="vsc-chat" aria-label="Example conversation">
        {project.conversation.map((m, i) => <p key={i} className={`vsc-msg vsc-msg--${m.from}`}><b>{m.from === "you" ? "You" : project.name}</b>{m.text}</p>)}
      </div>
      <p className="vsc-caption">Lines from the example flow on <a href={project.url} {...external}>adventuregen.ai/thumbnails</a>.</p>
    </section>}

    {project.demo && <section className="vsc-demo">
      <H2>Demo</H2>
      <div className="vsc-demo-frame" style={{ aspectRatio: project.demo.ratio ?? "16 / 9" }}>
        <MediaView media={project.demo} controls />
      </div>
      <p className="vsc-caption">{project.demo.note}</p>
    </section>}

    <button className="vsc-next" onClick={() => open(next.slug)}>
      <span>Next project</span>
      <strong><em>{next.index}</em>{next.name}</strong>
      <Icon name="arrow" />
    </button>
  </article>;
}

function SkillsView() {
  return <article className="vsc-doc">
    <p className="vsc-kicker"><span>about</span>skills.md</p>
    <h1 className="vsc-doc-title">Skills</h1>
    <p className="vsc-case-tagline">Product, engineering and design — the three things I combine on every project.</p>
    {skills.groups.map((g) => <section key={g.title}>
      <H2>{g.title}</H2>
      <div className="vsc-chips">{g.items.map((t) => <span className="vsc-chip" key={t}>{t}</span>)}</div>
    </section>)}
  </article>;
}

function ExperienceView() {
  return <article className="vsc-doc">
    <p className="vsc-kicker"><span>about</span>experience.md</p>
    <h1 className="vsc-doc-title">Experience</h1>
    <p className="vsc-case-tagline">From moderating esports scrims to shipping my own AI product.</p>
    <ol className="vsc-timeline">
      {[...experience.timeline].reverse().map((t) => <li key={t.year}><span>{t.year}</span><p>{t.text}</p></li>)}
    </ol>
  </article>;
}

function ContactView({ onContact }: { onContact?: () => void }) {
  return <article className="vsc-doc">
    <p className="vsc-kicker"><span>root</span>contact.json</p>
    <h1 className="vsc-doc-title">Let&apos;s build something.</h1>
    <p className="vsc-case-tagline">Thumbnails, a product, or an idea worth building together — every channel below reaches me directly.</p>
    <pre className="vsc-source vsc-source--json"><code>
      <span className="vsc-source-line"><span className="vsc-ln">1</span><span>{"{"}</span></span>
      <span className="vsc-source-line"><span className="vsc-ln">2</span><span>  <span className="tk-key">&quot;status&quot;</span>: <span className="tk-str">&quot;available for work&quot;</span>,</span></span>
      {contacts.map((c, i) => <span className="vsc-source-line" key={c.short}><span className="vsc-ln">{i + 3}</span><span>  <span className="tk-key">&quot;{c.short.toLowerCase()}&quot;</span>: <a className="tk-str tk-link" href={c.href} target={isExternal(c.href) ? "_blank" : undefined} rel={isExternal(c.href) ? "noreferrer noopener" : undefined}>&quot;{c.label}&quot;</a>{i < contacts.length - 1 ? "," : ""}</span></span>)}
      <span className="vsc-source-line"><span className="vsc-ln">{contacts.length + 3}</span><span>{"}"}</span></span>
    </code></pre>
    {onContact && <div className="vsc-actions"><button className="vsc-btn vsc-btn--primary" onClick={onContact}>Start a conversation <Icon name="arrow" /></button></div>}
  </article>;
}

// ───────────────────────── terminal ─────────────────────────
/** One step per typed character of a "> " line, one step for the final "✓" line. Remounted per file (key). */
function Terminal({ lines, fileLabel, state, onState, reduced }: { lines: string[]; fileLabel: string; state: PanelState; onState: (s: PanelState) => void; reduced: boolean }) {
  const steps = useMemo(() => lines.map((line) => (line.startsWith("✓") ? 1 : line.length)), [lines]);
  const total = steps.reduce((a, b) => a + b, 0);
  const [progress, setProgress] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 120, n = 0;
    lines.forEach((line, li) => {
      if (line.startsWith("✓")) { t += 260; const k = ++n; timers.push(setTimeout(() => setProgress(k), t)); return; }
      const step = Math.max(6, Math.min(16, 420 / line.length));
      for (let c = 0; c < steps[li]; c++) { t += step; const k = ++n; timers.push(setTimeout(() => setProgress(k), t)); }
      t += 90;
    });
    return () => timers.forEach(clearTimeout);
  }, [lines, steps, reduced]);
  const done = reduced ? total : progress;
  const typing = done < total;
  const shown: string[] = [];
  let left = done;
  for (let i = 0; i < lines.length && left > 0; i++) {
    const take = Math.min(left, steps[i]);
    shown.push(lines[i].startsWith("✓") ? lines[i] : lines[i].slice(0, take));
    left -= take;
  }
  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }); }, [done]);
  const last = lines[lines.length - 1];
  return <section className={`vsc-panel is-${state}`} aria-label="Terminal">
    <div className="vsc-panel-head">
      <div className="vsc-panel-tabs">
        <button className="is-active" onClick={() => onState(state === "collapsed" ? "open" : state)}>Terminal</button>
        <span>Problems <b>0</b></span>
        <span className="vsc-hide-compact">Output</span>
      </div>
      <div className="vsc-panel-actions">
        <span className={`vsc-run ${typing ? "is-busy" : "is-done"}`}>{typing ? <i className="vsc-spinner" /> : <Icon name="check" />}{typing ? "loading" : "ready"}</span>
        <span className="vsc-shell vsc-hide-compact">zsh — {fileLabel}</span>
        <button className="vsc-icon-btn" aria-label={state === "max" ? "Restore terminal" : "Maximize terminal"} onClick={() => onState(state === "max" ? "open" : "max")}><Icon name={state === "max" ? "minimize" : "maximize"} /></button>
        <button className="vsc-icon-btn" aria-label={state === "collapsed" ? "Show terminal" : "Hide terminal"} onClick={() => onState(state === "collapsed" ? "open" : "collapsed")}><Icon name={state === "collapsed" ? "maximize" : "close"} /></button>
      </div>
    </div>
    {state === "collapsed"
      ? <button className="vsc-term-peek" onClick={() => onState("open")}><span className="vsc-term-ok">{typing ? "…" : "✓"}</span>{typing ? "Loading…" : last.replace(/^✓\s*/, "")}</button>
      : <div className="vsc-term" ref={bodyRef} aria-live="polite">
        <p className="vsc-term-cmd"><span className="vsc-term-user">matthew@workspace</span> <span className="vsc-term-path">~/portfolio</span> <span className="vsc-term-sign">%</span> open {fileLabel}</p>
        {shown.map((line, i) => line.startsWith("✓")
          ? <p key={i} className="vsc-term-ok-line"><span className="vsc-term-ok">✓</span>{line.replace(/^✓\s*/, "")}</p>
          : <p key={i}><span className="vsc-term-gt">&gt;</span>{line.replace(/^>\s?/, " ")}</p>)}
        {!typing && <p className="vsc-term-cmd"><span className="vsc-term-user">matthew@workspace</span> <span className="vsc-term-path">~/portfolio</span> <span className="vsc-term-sign">%</span> <i className="vsc-caret" /></p>}
      </div>}
  </section>;
}

// ───────────────────────── app ─────────────────────────
export default function VSCodeApp({ onContact }: { onContact?: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const size = useSize(rootRef);
  const reduced = useReducedMotion();
  // opens on the featured project, with the README one tab away (dono, 06/11/2026: "deve começar em adventure-ai.tsx")
  const [tabs, setTabs] = useState<FileId[]>(["readme", projects[0].slug]);
  const [active, setActive] = useState<FileId>(projects[0].slug);
  const [folders, setFolders] = useState<Record<string, boolean>>({ projects: true, about: true });
  const [explorer, setExplorer] = useState(true);          // wide/medium: shown or collapsed (activity bar)
  const [drawer, setDrawer] = useState(false);             // compact: explorer as a drawer
  const [preview, setPreview] = useState(true);            // wide: preview to the side
  const [inlineOpen, setInlineOpen] = useState(true);      // medium/compact: preview inside the case study
  const [source, setSource] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [panelChoice, setPanel] = useState<PanelState | null>(null);
  const panel: PanelState = panelChoice ?? (size === "compact" ? "collapsed" : "open");   // phones start with it folded

  const project = projectBySlug.get(active as CaseStudy["slug"]);
  const info = fileName(active);

  const open = useCallback((id: FileId) => {
    setTabs((t) => (t.includes(id) ? t : [...t, id]));
    setActive(id);
    setDrawer(false);
    setMediaIndex(0);
    setSource(false);
    editorRef.current?.scrollTo({ top: 0 });
  }, []);

  function closeTab(id: FileId) {
    setTabs((t) => {
      const rest = t.filter((x) => x !== id);
      if (!rest.length) { setActive("readme"); return ["readme"]; }
      if (id === active) setActive(rest[Math.max(0, t.indexOf(id) - 1)]);
      return rest;
    });
  }

  const terminalLines = useMemo(() => {
    if (project) return project.terminal;
    if (active === "skills") return skills.terminal;
    if (active === "experience") return experience.terminal;
    if (active === "contact") return contactTerminal;
    return readme.terminal;
  }, [active, project]);

  const sidePreview = !!project && size === "wide" && preview && !source;
  const inlinePreview = project && !source && !sidePreview
    ? <div className={`vsc-inline-preview ${inlineOpen ? "is-open" : ""}`}>
      <button className="vsc-inline-toggle" onClick={() => setInlineOpen((o) => !o)} aria-expanded={inlineOpen}>
        <Icon name="chevron" /><span>Preview</span><em>{project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</em>
      </button>
      {inlineOpen && <Browser project={project} index={mediaIndex} onIndex={setMediaIndex} onExpand={() => setLightbox(mediaIndex)} inline />}
    </div>
    : null;

  const language = info.kind === "tsx" ? "TypeScript JSX" : info.kind === "json" ? "JSON" : "Markdown";
  const showExplorer = size === "compact" ? drawer : explorer;

  return <div ref={rootRef} className={`vsc vsc--${size} ${inter.className}`} style={{ ["--vsc-mono" as string]: mono.style.fontFamily }}>
    <div className="vsc-body">
      <nav className="vsc-activity" aria-label="Activity bar">
        <button className={showExplorer ? "is-active" : ""} aria-label="Toggle Explorer" aria-pressed={showExplorer} onClick={() => (size === "compact" ? setDrawer((d) => !d) : setExplorer((e) => !e))}><Icon name="files" /></button>
        <span aria-hidden="true"><Icon name="search" /></span>
        <span aria-hidden="true"><Icon name="branch" /></span>
        <span aria-hidden="true"><Icon name="run" /></span>
        <span aria-hidden="true"><Icon name="extensions" /></span>
        <span className="vsc-activity-bottom" aria-hidden="true"><Icon name="account" /></span>
        <span aria-hidden="true"><Icon name="settings" /></span>
      </nav>

      {showExplorer && <aside className="vsc-explorer" aria-label="Explorer">
        <div className="vsc-explorer-head"><span>Explorer</span>{size === "compact" && <button className="vsc-icon-btn" aria-label="Close Explorer" onClick={() => setDrawer(false)}><Icon name="close" /></button>}</div>
        <div className="vsc-tree" role="tree" aria-label="Portfolio files">
          <div className="vsc-tree-root"><Icon name="chevron" />Portfolio</div>
          {tree.map((node) => "folder" in node
            ? <div key={node.folder} role="group">
              <button className={`vsc-tree-folder ${folders[node.folder] ? "is-open" : ""}`} aria-expanded={!!folders[node.folder]} onClick={() => setFolders((f) => ({ ...f, [node.folder]: !f[node.folder] }))}>
                <Icon name="chevron" />{node.folder}
              </button>
              {folders[node.folder] && node.items.map((item) => <button key={item.id} role="treeitem" aria-selected={active === item.id} className={`vsc-tree-file vsc-tree-file--nested ${active === item.id ? "is-active" : ""}`} onClick={() => open(item.id)}>
                <FileIcon kind={item.kind} />{item.name}
              </button>)}
            </div>
            : <button key={node.id} role="treeitem" aria-selected={active === node.id} className={`vsc-tree-file ${active === node.id ? "is-active" : ""}`} onClick={() => open(node.id)}>
              <FileIcon kind={node.kind} />{node.name}
            </button>)}
        </div>
        <div className="vsc-explorer-foot">
          <span><Icon name="branch" />main</span>
          <span>{projects.length} projects</span>
        </div>
      </aside>}
      {size === "compact" && drawer && <button className="vsc-scrim" aria-label="Close Explorer" onClick={() => setDrawer(false)} />}

      <div className="vsc-main">
        <div className="vsc-tabs" role="tablist" aria-label="Open files">
          {size === "compact" && <button className="vsc-icon-btn vsc-menu" aria-label="Open Explorer" onClick={() => setDrawer(true)}><Icon name="menu" /></button>}
          <div className="vsc-tabs-scroll">
            {tabs.map((id) => {
              const f = fileName(id);
              return <div key={id} role="tab" aria-selected={id === active} className={`vsc-tab ${id === active ? "is-active" : ""}`}>
                <button className="vsc-tab-label" onClick={() => open(id)}><FileIcon kind={f.kind} />{f.name}</button>
                <button className="vsc-tab-close" aria-label={`Close ${f.name}`} onClick={() => closeTab(id)}><Icon name="close" /></button>
              </div>;
            })}
          </div>
          {project && size === "wide" && <button className={`vsc-icon-btn vsc-tab-action ${preview ? "is-on" : ""}`} aria-pressed={preview} aria-label="Toggle preview to the side" title="Preview to the side" onClick={() => setPreview((p) => !p)}><Icon name="split" /></button>}
        </div>

        <div className="vsc-crumbs">
          <span>portfolio</span>{info.folder && <><Icon name="chevron" /><span>{info.folder}</span></>}<Icon name="chevron" /><span className="vsc-crumb-file"><FileIcon kind={info.kind} />{info.name}</span>
          {project && <div className="vsc-segment" role="group" aria-label="View">
            <button className={!source ? "is-active" : ""} onClick={() => setSource(false)}>Case study</button>
            <button className={source ? "is-active" : ""} onClick={() => setSource(true)}>Source</button>
          </div>}
        </div>

        <div className={`vsc-split ${sidePreview ? "has-preview" : ""}`}>
          <div className="vsc-editor" ref={editorRef}>
            <div className="vsc-editor-inner" key={`${active}-${source}`}>
              {active === "readme" && <ReadmeView open={open} onContact={onContact} />}
              {active === "skills" && <SkillsView />}
              {active === "experience" && <ExperienceView />}
              {active === "contact" && <ContactView onContact={onContact} />}
              {project && (source ? <SourceView project={project} /> : <ProjectView project={project} inlinePreview={inlinePreview} open={open} />)}
            </div>
          </div>
          {sidePreview && project && <aside className="vsc-side">
            <Browser key={project.slug} project={project} index={mediaIndex} onIndex={setMediaIndex} onExpand={() => setLightbox(mediaIndex)} />
            <div className="vsc-side-meta">
              <p><span>Status</span><b><i className="vsc-dot" />{project.status}</b></p>
              <p><span>Category</span><b>{project.category}</b></p>
              <p><span>Link</span><a href={project.url} {...external}>{project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}<Icon name="external" /></a></p>
            </div>
          </aside>}
        </div>

        <Terminal key={active} lines={terminalLines} fileLabel={info.name} state={panel} onState={setPanel} reduced={reduced} />
      </div>
    </div>

    <footer className="vsc-statusbar">
      <span className="vsc-status-remote"><Icon name="branch" />main</span>
      <span><Icon name="error" />0 <Icon name="warn" />0</span>
      <span className="vsc-status-spacer" />
      <span className="vsc-hide-compact">{language}</span>
      <span className="vsc-hide-compact">UTF-8</span>
      <button className="vsc-status-available" onClick={onContact}><i />Available for work</button>
      <span className="vsc-hide-compact" aria-hidden="true"><Icon name="bell" /></span>
    </footer>

    {lightbox !== null && project && <Lightbox items={project.media} index={lightbox} onIndex={(i) => { setLightbox(i); setMediaIndex(i); }} onClose={() => setLightbox(null)} />}
  </div>;
}
