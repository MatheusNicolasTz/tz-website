"use client";

import Image from "next/image";
import { Roboto } from "next/font/google";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode, type WheelEvent } from "react";
import { thumbs } from "./thumbs";
import { contacts, isExternal } from "./contacts";
import { designProjects, devProjects, profile, timeline, type PortfolioProject as Project } from "./portfolio-data";
import "./desktop.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
type App = "thumbnails" | "dev" | "design" | "about" | "contact" | "youtube";
type View = App;
const titles: Record<View, string> = { thumbnails: "Photoshop", dev: "VS Code", design: "Figma", about: "README.md", contact: "Let's work together", youtube: "YouTube" };
const ytClients = [
  { name: "Like Nastya", color: "#e0507a" },
  { name: "Corey Funk", color: "#3b82c4" },
  { name: "Jumpshot", color: "#2f9e6e" },
  { name: "SML Universe", color: "#c9822e" },
  { name: "Khalid Al Ameri", color: "#7a5cc9" },
  { name: "Visual Venture", color: "#d9455c" },
  { name: "Justicul", color: "#23a1a1" },
  { name: "cinelumi", color: "#b3762e" },
  { name: "Beast Theory", color: "#5c8fd9" },
  { name: "Kriekel", color: "#9b4fd1" },
  { name: "Nonstop", color: "#4caf7d" },
  { name: "TBNRFrags", color: "#c74f4f" },
  { name: "Nate Curtiss", color: "#4f7fc7" },
  { name: "Freestyle TV", color: "#c9a12e" },
];
const ytVideos = [
  { id: "0obAZyRWeX0", title: "Nastya explains to her little friends how to behave in public places", channel: "Like Nastya", views: "31.1M", duration: "10:08", avatar: "https://yt3.ggpht.com/ytc/AIdro_mVv_9v6t_6ni8YIQZWxmabSsNCVTyGQ48CHQ8-2W-OQtM=s88-c-k-c0x00ffffff-no-rj" },
  { id: "b0KeXtvDs9Y", title: "I Built a $100,000 Waterslide!", channel: "Corey Funk", views: "344.3K", duration: "29:44", avatar: "https://yt3.ggpht.com/ytc/AIdro_lyu26Ivpnf0kKYVQ4WZli0-NhPgSmhO6kj--8GgHylfg=s88-c-k-c0x00ffffff-no-rj" },
  { id: "KIXBa3OrXbQ", title: "IMPOSSIBLE NBA Moments..", channel: "Jumpshot", views: "718.6K", duration: "9:16", avatar: "https://yt3.ggpht.com/S0XVJcTVdonCxj6dsb4HhcLJo8cfn8KAwf-N5gNgT8DzWwF2YfP7BYWcrxVwI6il1Q1FjHP9=s88-c-k-c0x00ffffff-no-rj" },
  { id: "DyZby354RaU", title: "The Disturbing Rabbit Hole Behind SML", channel: "SML Universe", views: "583.7K", duration: "1:14:53", avatar: "https://yt3.ggpht.com/s-c9cdA4o5jOiR3mat1-fGC1P_5JGX6WmyapQRu_0D8hPLoXoWre8D-nHrEcMta5BE8PwAoxniE=s88-c-k-c0x00ffffff-no-rj" },
  { id: "376Ay_Lv-9o", title: "I CRASHED A YouTuber’s WEDDING!", channel: "Khalid Al Ameri", views: "5M", duration: "8:02", avatar: "https://yt3.ggpht.com/FQbSTDsboqmzUsbYWYrgGBueIzsL94ulf77thP8Bby-1d6vY1BRlDD1UuMp2uE9hL2iCTcTCmw=s88-c-k-c0x00ffffff-no-rj" },
  { id: "o9p7XHkY6uE", title: "The Hidden Dangers of YouTube Kids Content", channel: "Visual Venture", views: "2.6M", duration: "24:39", avatar: "https://yt3.ggpht.com/54__vw1l8UHq56FNauFWMCvXxj_Qi-0L6vkTBJj0WWeBOZwvtfZ1xnQritRnkAmuLH9ARHND=s88-c-k-c0x00ffffff-no-rj" },
  { id: "ro9MxPHylPE", title: "Testing my $100,000 Extreme Waterslide!", channel: "Corey Funk", views: "448.4K", duration: "17:38", avatar: "https://yt3.ggpht.com/ytc/AIdro_lyu26Ivpnf0kKYVQ4WZli0-NhPgSmhO6kj--8GgHylfg=s88-c-k-c0x00ffffff-no-rj" },
  { id: "q9PhL38FXcI", title: "The Satisfying Downfall Of Nadia (Warzone Cheater)", channel: "Justicul", views: "1.8M", duration: "12:40", avatar: "https://yt3.ggpht.com/ytc/AIdro_lSh3qORX4oji1TcF4Df_C97PtLc0Trzxsc8wBFF8Hxeko=s88-c-k-c0x00ffffff-no-rj" },
  { id: "VoMfhzAxic4", title: "The Laziest Filmmaker Ever", channel: "cinelumi", views: "155K", duration: "10:12", avatar: "https://yt3.ggpht.com/cEFZF8ZS4W0HOUIhbFRbX3oR6UJecJb6tNN_vXEDY39p3PoVUdQacaTF0tazT4MpSKiOGoKjMw=s88-c-k-c0x00ffffff-no-rj" },
  { id: "4NamawX04KA", title: "EVERY Time MrBeast Was Almost KILLED", channel: "Beast Theory", views: "74.9K", duration: "14:41", avatar: "https://yt3.ggpht.com/2_s0vyiWLL2ScK7T5Umdv6PpMeTGV7SjQMjX8URt5ZTal2Te4gPAlzMXgQOBtCB7WDCtQcraDA=s88-c-k-c0x00ffffff-no-rj" },
  { id: "eqSia3bWyPI", title: "Overleef 7 Dagen Op Het Eiland, Win €1000", channel: "Kriekel", views: "267.9K", duration: "19:20", avatar: "https://yt3.ggpht.com/DJMsNPmWd9ROWwnrqgw5Jm6wpbl_FXT3t1yb1B5lLYsrH2o9i7dZW5AwpFaNN6cXlnjr6-ZUlQ=s88-c-k-c0x00ffffff-no-rj" },
  { id: "EgSGtqvUgfY", title: "How Skip Bayless Became The Most Hated Man On Sports TV", channel: "Nonstop", views: "437K", duration: "14:33", avatar: "https://yt3.ggpht.com/K_7w0RqxZcIRdiRO55fLzC-USfG8kxtf-n_OfJ5148hh9-fwSno3a8MlIUeC3ADY6KMFdOaOnGg=s88-c-k-c0x00ffffff-no-rj" },
  { id: "RUgA2-rwIMA", title: "Youtubers Control My Fortnite For 24 Hours!", channel: "TBNRFrags", views: "1.2M", duration: "24:15", avatar: "https://yt3.ggpht.com/ytc/AIdro_nUooR-VzmZ2i_bhd8Zhwk-_BjJd1xJE1ugZSyvSb2oxDM=s88-c-k-c0x00ffffff-no-rj" },
  { id: "ZNPeAS7yuxU", title: "How to Get Viral Video Ideas", channel: "Nate Curtiss", views: "84.9K", duration: "11:06", avatar: "https://yt3.ggpht.com/ibIH2eRFdyUZ_U9bAt8D3TUD5LpMhtv4vTwYsKZhur8iw3KWjZ9VcsYt4KJInypvd0UVFvhe2g=s88-c-k-c0x00ffffff-no-rj" },
  { id: "aLvnmQt4svA", title: "Most Loved VS Most Hated Rappers", channel: "Freestyle TV", views: "1M", duration: "13:26", avatar: "https://yt3.ggpht.com/tDPLrDx33wVCnCLfgBEMrwGUUUhxRwcOxMRAxD9d4t8uPzqes5dk8-yK6yjbCqp8DVzaHxeoWA=s88-c-k-c0x00ffffff-no-rj" },
  { id: "VmREw6ygGOA", title: "What Happened To EVERY Forgotten SML Girlfriend?", channel: "SML Universe", views: "1.3M", duration: "12:24", avatar: "https://yt3.ggpht.com/s-c9cdA4o5jOiR3mat1-fGC1P_5JGX6WmyapQRu_0D8hPLoXoWre8D-nHrEcMta5BE8PwAoxniE=s88-c-k-c0x00ffffff-no-rj" },
];
function channelAvatar(name: string) {
  return ytVideos.find(v => v.channel === name)?.avatar;
}
function stableAvatar(url: string) {
  return url.replace("yt3.ggpht.com", "yt3.googleusercontent.com");
}
function ChannelImage({ src, name, size, className, color = "#555" }: { src?: string; name: string; size: number; className: string; color?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <span className={className} style={{ background: color }}>{name[0].toUpperCase()}</span>;
  return <Image src={stableAvatar(src)} alt={`${name} channel`} width={size} height={size} unoptimized className={className} referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}
type GlyphName = "mail" | "grid" | "person" | "arrow" | "wifi" | "sun" | "search" | "git" | "extensions" | "menu";
function Glyph({ name }: { name: GlyphName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "mail" && <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>}
    {name === "grid" && <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>}
    {name === "person" && <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>}
    {name === "arrow" && <path d="M5 19 19 5M5 5h14v14" />}
    {name === "wifi" && <><path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0" /><circle cx="12" cy="20" r=".5" /></>}
    {name === "sun" && <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" /></>}
    {name === "search" && <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>}
    {name === "git" && <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M12 7v6m0 0-6 4m6-4 6 4" /></>}
    {name === "extensions" && <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><path d="M17 13a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" /></>}
    {name === "menu" && <path d="M3 6h18M3 12h18M3 18h18" />}
  </svg>;
}

function AppIcon({ src, alt = "" }: { src: string; alt?: string }) {
  return <Image src={src} alt={alt} width={64} height={64} />;
}

function pascalCase(slug: string) {
  return slug.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("");
}

function projectSlug(p: Project) {
  return p.image ?? p.name.toLowerCase().replace(/\s+/g, "-");
}
function VSCodeApp({ projects, active, onSelect }: { projects: Project[]; active: number; onSelect: (index: number) => void }) {
  const project = projects[active];
  const codeLines: ReactNode[] = [
    <span className="vsc-com" key="c1">{`// ${project.name} — ${project.type}`}</span>,
    null,
    <span key="c3"><span className="vsc-kw">export default function</span> <span className="vsc-fn">{pascalCase(projectSlug(project))}</span>() {"{"}</span>,
    <span key="c4">&nbsp;&nbsp;<span className="vsc-kw">return</span> (</span>,
    <span key="c5">&nbsp;&nbsp;&nbsp;&nbsp;<span className="vsc-tag">&lt;LiveSite</span> <span className="vsc-attr">description</span>=<span className="vsc-str">&quot;{project.description}&quot;</span> /&gt;</span>,
    <span key="c6">&nbsp;&nbsp;);</span>,
    <span key="c7">{"}"}</span>,
  ];
  return <div className="vscode" style={{ fontFamily: roboto.style.fontFamily }}>
    <div className="vscode-activitybar">
      <span className="is-active" aria-hidden="true"><Glyph name="grid" /></span>
      <span aria-hidden="true"><Glyph name="search" /></span>
      <span aria-hidden="true"><Glyph name="git" /></span>
      <span aria-hidden="true"><Glyph name="extensions" /></span>
    </div>
    <div className="vscode-sidebar">
      <p>EXPLORER</p>
      <div className="vscode-folder">PORTFOLIO-PROJECTS</div>
      {projects.map((p, i) => <button key={p.name} className={i === active ? "is-active" : ""} onClick={() => onSelect(i)}><span className="vscode-dot" />{projectSlug(p)}.tsx</button>)}
    </div>
    <div className="vscode-main">
      <div className="vscode-tabs">{projects.map((p, i) => <button key={p.name} className={i === active ? "is-active" : ""} onClick={() => onSelect(i)}><span className="vscode-dot" />{projectSlug(p)}.tsx</button>)}</div>
      <div className="vscode-split">
        <pre className="vscode-code"><code>{codeLines.map((line, i) => <span className="vscode-line" key={i}><span className="vscode-ln">{i + 1}</span><span>{line}</span></span>)}</code></pre>
        <div className="vscode-preview">
          <div className="vscode-preview-bar"><Glyph name="arrow" /><span>{project.url.replace(/^https?:\/\//, "")}</span></div>
          {project.image
            ? <a href={project.url} target="_blank" rel="noreferrer noopener"><Image src={`/projects/${project.image}.webp`} alt={`${project.name} website`} width={640} height={400} sizes="(max-width: 700px) 90vw, 420px" /></a>
            : <div className="vscode-preview-empty">Preview coming soon</div>}
        </div>
      </div>
    </div>
  </div>;
}

function PhotoshopApp({ thumbs, active, onSelect }: { thumbs: string[]; active: number; onSelect: (index: number) => void }) {
  const activeLayerRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { activeLayerRef.current?.scrollIntoView({ block: "nearest" }); }, [active]);
  return <div className="photoshop" style={{ fontFamily: roboto.style.fontFamily }}>
    <div className="ps-menubar">{["File", "Edit", "Image", "Layer", "Type", "Select", "Filter", "View", "Window", "Help"].map(m => <span key={m}>{m}</span>)}</div>
    <div className="ps-body">
      <div className="ps-tools" aria-hidden="true">{Array.from({ length: 10 }).map((_, i) => <span key={i} />)}</div>
      <div className="ps-canvas-area">
        <div className="ps-doctab">thumbnail_{String(active + 1).padStart(2, "0")}.jpg @ 100% (RGB/8#)</div>
        <div className="ps-canvas">
          <button className="ps-nav ps-nav-prev" aria-label="Previous thumbnail" onClick={() => onSelect((active - 1 + thumbs.length) % thumbs.length)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg></button>
          <Image src={`/thumbnails/${thumbs[active]}`} alt={`Thumbnail ${active + 1} by Matthew`} width={900} height={506} sizes="(max-width: 900px) 80vw, 620px" />
          <button className="ps-nav ps-nav-next" aria-label="Next thumbnail" onClick={() => onSelect((active + 1) % thumbs.length)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg></button>
        </div>
      </div>
      <div className="ps-panels">
        <div className="ps-panel ps-properties">
          <p>Properties</p>
          <span>Canvas Size</span>
          <div className="ps-field"><label>W</label><b>1280 px</b></div>
          <div className="ps-field"><label>H</label><b>720 px</b></div>
          <div className="ps-field"><label>Res</label><b>72 ppi</b></div>
        </div>
        <div className="ps-panel ps-layers">
          <p>Layers</p>
          <div className="ps-layer-list">
            {thumbs.map((file, i) => <button key={file} ref={i === active ? activeLayerRef : undefined} className={i === active ? "is-active" : ""} onClick={() => onSelect(i)}><Image src={`/thumbnails/${file}`} alt="" width={34} height={20} />thumbnail_{String(i + 1).padStart(2, "0")}</button>)}
          </div>
        </div>
      </div>
    </div>
    <div className="ps-status"><span>100%</span><span>Doc: 8.44M/8.44M</span></div>
  </div>;
}

function FigmaApp({ projects, active, onSelect }: { projects: Project[]; active: number; onSelect: (index: number) => void }) {
  const project = projects[active];
  const lastWheel = useRef(0);
  function handleCanvasWheel(event: WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const now = Date.now();
    if (now - lastWheel.current < 160) return;
    lastWheel.current = now;
    onSelect((active + (event.deltaY > 0 ? 1 : -1) + projects.length) % projects.length);
  }
  return <div className="figma" style={{ fontFamily: roboto.style.fontFamily }}>
    <div className="figma-topbar">
      <span className="figma-topbar-mark"><AppIcon src="/tz/icons/figma.webp" alt="Figma" /></span>
      <span className="figma-filename">Portfolio.fig</span>
      <div className="figma-tools" aria-hidden="true"><span /><span /><span /><span /></div>
      <span className="figma-share">Share</span>
    </div>
    <div className="figma-body">
      <div className="figma-sidebar">
        <p>Pages</p>
        <div className="figma-page is-active">Website Designs</div>
        <p>Layers</p>
        {projects.map((p, i) => <button key={p.name} className={i === active ? "is-active" : ""} onClick={() => onSelect(i)}><span className="figma-frame-dot" />{p.name}</button>)}
      </div>
      <div className="figma-canvas" onWheel={handleCanvasWheel}>
        <button className="figma-nav figma-nav-prev" aria-label="Previous design" onClick={() => onSelect((active - 1 + projects.length) % projects.length)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg></button>
        <div>
          <div className="figma-frame-label">{project.name} — Desktop</div>
          <a className="figma-frame" href={project.url} target="_blank" rel="noreferrer noopener"><Image src={`/projects/${project.image}.webp`} alt={`${project.name} design`} width={900} height={560} sizes="(max-width: 900px) 85vw, 560px" /></a>
        </div>
        <button className="figma-nav figma-nav-next" aria-label="Next design" onClick={() => onSelect((active + 1) % projects.length)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg></button>
      </div>
      <div className="figma-panel">
        <p>Design</p>
        <div className="figma-field"><label>W</label><b>1440</b></div>
        <div className="figma-field"><label>H</label><b>900</b></div>
        <div className="figma-field"><label>Corner radius</label><b>12</b></div>
        <p>Notes</p>
        <span className="figma-note">{project.description}</span>
      </div>
    </div>
  </div>;
}

function YouTubeApp() {
  return <div className="youtube" style={{ fontFamily: roboto.style.fontFamily }}>
    <div className="yt-topbar">
      <span className="yt-menu" aria-hidden="true"><Glyph name="menu" /></span>
      <span className="yt-logo"><span className="yt-logo-badge"><svg viewBox="0 0 24 24" fill="#fff"><path d="M9 7v10l8-5-8-5Z" /></svg></span>YouTube</span>
      <div className="yt-search"><Glyph name="search" /><span>Search</span></div>
      <span className="yt-create">+ Create</span>
      <span className="yt-avatar" aria-hidden="true">M</span>
    </div>
    <div className="yt-body">
      <div className="yt-sidebar">
        <button className="is-active"><Glyph name="grid" />Home</button>
        <p>Clients</p>
        {ytClients.map(c => <button key={c.name}><ChannelImage src={channelAvatar(c.name)} name={c.name} size={24} className="yt-avatar-sm" color={c.color} />{c.name}</button>)}
      </div>
      <div className="yt-main">
        <div className="yt-chips">{["All", "Thumbnails", "Portfolio", "Case studies"].map(chip => <span key={chip} className={chip === "All" ? "is-active" : ""}>{chip}</span>)}</div>
        <div className="yt-grid">
          {ytVideos.map(v => <a className="yt-card" key={v.id} href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer noopener">
            <div className="yt-thumb"><Image src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} width={320} height={180} loading="lazy" unoptimized sizes="(max-width: 700px) 90vw, 320px" /><span className="yt-duration">{v.duration}</span></div>
            <div className="yt-meta">
              <ChannelImage src={v.avatar} name={v.channel} size={36} className="yt-avatar-card" />
              <div>
                <p className="yt-title">{v.title}</p>
                <p className="yt-sub">{v.channel}</p>
                <p className="yt-sub">{v.views} views</p>
              </div>
            </div>
          </a>)}
        </div>
      </div>
    </div>
  </div>;
}

type WinState = { id: View; minimized: boolean; maximized: boolean; x: number; y: number; z: number };

export default function Desktop({ initialView = null }: { initialView?: App | null }) {
  const [windows, setWindows] = useState<WinState[]>(() => initialView
    ? [{ id: initialView, minimized: false, maximized: false, x: 0, y: 0, z: 1 }]
    : [{ id: "youtube", minimized: false, maximized: false, x: 0, y: 0, z: 1 }]);
  const [clock, setClock] = useState("Welcome");
  const [musicOpen, setMusicOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeDesign, setActiveDesign] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const opener = useRef<HTMLElement | null>(null);
  const winRefs = useRef<Partial<Record<View, HTMLElement | null>>>({});
  const pendingFocus = useRef<View | null>(null);
  const zCounter = useRef(1);
  const drag = useRef<{ id: View; x: number; y: number; originX: number; originY: number } | null>(null);

  const isOpen = (id: View) => windows.some(w => w.id === id && !w.minimized);

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()));
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!pendingFocus.current) return;
    winRefs.current[pendingFocus.current]?.focus();
    pendingFocus.current = null;
  }, [windows]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const top = windows.filter(w => !w.minimized).sort((a, b) => b.z - a.z)[0];
      if (!top) return;
      setWindows(prev => prev.filter(w => w.id !== top.id));
      opener.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [windows]);

  useEffect(() => {
    if (!musicOpen) return;
    const closePanel = () => setMusicOpen(false);
    window.addEventListener("click", closePanel);
    return () => window.removeEventListener("click", closePanel);
  }, [musicOpen]);

  function open(id: View) {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setWindows(prev => {
      const z = ++zCounter.current;
      if (prev.some(w => w.id === id)) return prev.map(w => w.id === id ? { ...w, minimized: false, z } : w);
      const offset = (prev.length % 5) * 26;
      return [...prev, { id, minimized: false, maximized: false, x: offset, y: offset, z }];
    });
    pendingFocus.current = id;
  }
  function bumpZ(id: View) {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, z: ++zCounter.current } : w));
  }
  function closeWindow(id: View) {
    setWindows(prev => prev.filter(w => w.id !== id));
    opener.current?.focus();
  }
  function minimizeWindow(id: View) {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  }
  function toggleMaximize(id: View) {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized, x: 0, y: 0 } : w));
  }
  function showDesktop() {
    setWindows(prev => prev.map(w => ({ ...w, minimized: true })));
  }
  function startDrag(id: View, isMaximized: boolean, event: PointerEvent<HTMLDivElement>) {
    if (isMaximized || window.innerWidth < 700 || (event.target as HTMLElement).closest("button")) return;
    const win = windows.find(w => w.id === id);
    drag.current = { id, x: event.clientX, y: event.clientY, originX: win?.x ?? 0, originY: win?.y ?? 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const { id, x, y, originX, originY } = drag.current;
    const rect = (event.currentTarget.closest(".desktop-window") as HTMLElement | null)?.getBoundingClientRect();
    const limitX = (window.innerWidth - (rect?.width ?? 0)) / 2;
    const nx = Math.max(-limitX, Math.min(limitX, originX + event.clientX - x));
    const ny = Math.max(-24, Math.min(window.innerHeight * .3, originY + event.clientY - y));
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x: nx, y: ny } : w));
  }
  function endDrag() { drag.current = null; }

  return <main className="desktop">
    <div className="desktop-wallpaper" aria-hidden="true"><Image src="/tz/tzdevbg.webp" alt="" fill sizes="100vw" quality={60} loading="lazy" /></div>
    <header className="mobile-statusbar" aria-hidden="true">
      <time>{clock}</time>
      <div className="mobile-statusbar-icons">
        <Glyph name="wifi" />
        <span className="mobile-signal"><i /><i /><i /><i /></span>
        <span className="mobile-battery" />
      </div>
    </header>
    <header className="desktop-menubar">
      <button className="desktop-brand" onClick={() => open("about")} aria-label="About Matthew">m<span>✳</span></button>
      <nav aria-label="Main navigation"><button onClick={() => open("thumbnails")}>Photoshop</button><button onClick={() => open("design")}>Figma</button><button onClick={() => open("dev")}>VS Code</button><button onClick={() => open("contact")}>Contact</button></nav>
      <div className="desktop-status"><span className="desktop-available"><i /> Available for work</span><Glyph name="wifi" /><span className="desktop-battery" aria-label="Creative energy: full" /><time>{clock}</time></div>
    </header>

    <section className="desktop-workspace" aria-label="Portfolio desktop">
      <div className="desktop-intro"><h1>A little design.<br />A little code.<br /><em>A lot of me.</em></h1><span>Welcome to my desktop.</span></div>
      <aside className="desktop-shortcuts" aria-label="Portfolio apps">
        <button onClick={() => open("thumbnails")}><span className="dock-app dock-photoshop desktop-shortcut-icon"><AppIcon src="/tz/icons/ps.webp" alt="Photoshop" /></span><strong>Photoshop</strong></button>
        <button onClick={() => open("youtube")}><span className="dock-app dock-youtube desktop-shortcut-icon"><svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M9 7v10l8-5-8-5Z" /></svg></span><strong>YouTube</strong></button>
        <button onClick={() => open("design")}><span className="dock-app dock-figma desktop-shortcut-icon"><AppIcon src="/tz/icons/figma.webp" alt="Figma" /></span><strong>Figma</strong></button>
        <button onClick={() => open("dev")}><span className="dock-app dock-vscode desktop-shortcut-icon"><AppIcon src="/tz/icons/vscode.webp" alt="VS Code" /></span><strong>VS Code</strong></button>
        <a href="https://www.adventuregen.ai/" target="_blank" rel="noreferrer noopener"><span className="dock-app dock-adventure desktop-shortcut-icon"><AppIcon src="/tz/icons/adventure-ai.webp" alt="Adventure AI" /></span><strong>Adventure AI</strong></a>
        <button onClick={() => open("about")}><span className="desktop-readme"><span>hello.</span><i /><i /><i /><b>↗</b></span><strong>Read me.txt</strong></button>
      </aside>
      <button className="desktop-note" onClick={() => open("contact")}><span>A note for you</span><p>Have something<br />in mind?<br /><em>Let’s make it real.</em></p><span>Say hello ↗</span></button>
      <div className="mobile-homescreen" aria-label="Portfolio apps">
        <button onClick={() => open("about")}><span className="dock-app dock-notes mobile-app-icon"><span /><i /><i /><i /></span><strong>About</strong></button>
        <a href="https://www.adventuregen.ai/" target="_blank" rel="noreferrer noopener"><span className="dock-app dock-adventure mobile-app-icon"><AppIcon src="/tz/icons/adventure-ai.webp" alt="Adventure AI" /></span><strong>Adventure AI</strong></a>
        <button onClick={() => open("contact")}><span className="dock-app dock-mail mobile-app-icon"><Glyph name="mail" /></span><strong>Contact</strong></button>
        <a href="https://x.com/TzDev_" target="_blank" rel="noreferrer noopener"><span className="dock-app dock-x mobile-app-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.6h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.9-7.6-6.7 7.6H.3l8.6-9.9L-.2 1.6h7.6l5.3 7 6.2-7zm-1.3 19.6h2L6.5 3.7H4.3l13.3 17.5z" /></svg></span><strong>X</strong></a>
        <button onClick={() => open("youtube")}><span className="dock-app dock-youtube mobile-app-icon"><svg viewBox="0 0 24 24" fill="#fff"><path d="M9 7v10l8-5-8-5Z" /></svg></span><strong>YouTube</strong></button>
      </div>
    </section>

    {windows.filter(w => !w.minimized).map(w => <section key={w.id} ref={el => { winRefs.current[w.id] = el; }} role="dialog" aria-label={titles[w.id]} tabIndex={-1} className={`desktop-window ${w.maximized ? "desktop-window--maximized" : ""}`} style={{ "--window-x": `${w.x}px`, "--window-y": `${w.y}px`, zIndex: w.z } as CSSProperties} onPointerDownCapture={() => bumpZ(w.id)}>
      <div className="desktop-titlebar" onPointerDown={event => startDrag(w.id, w.maximized, event)} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        <div className="desktop-controls"><button aria-label="Close window" onClick={() => closeWindow(w.id)}>×</button><button aria-label="Minimize window" onClick={() => minimizeWindow(w.id)}>−</button><button aria-label={w.maximized ? "Restore window" : "Maximize window"} onClick={() => toggleMaximize(w.id)}>+</button></div>
        <span>{titles[w.id]}</span><span className="desktop-window-owner">Matthew&apos;s desktop</span>
      </div>
      <div className={`desktop-window-body ${w.id === "dev" || w.id === "thumbnails" || w.id === "design" || w.id === "youtube" ? "desktop-window-body--app" : ""}`}>
        {w.id === "dev" && <VSCodeApp projects={devProjects} active={activeProject} onSelect={setActiveProject} />}
        {w.id === "thumbnails" && <PhotoshopApp thumbs={thumbs} active={activeLayer} onSelect={setActiveLayer} />}
        {w.id === "design" && <FigmaApp projects={designProjects} active={activeDesign} onSelect={setActiveDesign} />}
        {w.id === "youtube" && <YouTubeApp />}
        {w.id === "about" && <div className="desktop-window-content desktop-window-content--full"><div className="desktop-about"><span className="desktop-eyebrow">HELLO, INTERNET.</span><h2>I&apos;m {profile.name}.<br /><em>I make things.</em></h2>{profile.about.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="desktop-about-stats"><span><strong>{profile.youtubeViews}</strong>YouTube views</span><span><strong>{profile.creators}</strong>creators</span><span><strong>{profile.adventureUsers}</strong>Adventure AI users</span></div><div className="desktop-timeline"><p>My journey</p>{timeline.map(t => <div className="desktop-timeline-row" key={t.year}><span>{t.year}</span><p>{t.text}</p></div>)}</div><div className="desktop-callout"><p>Open to building something bigger, too.</p><p>I&apos;ve handled every part of Adventure AI&apos;s tech since day one — front end, back end, all of it. If you&apos;ve got a good idea, I&apos;m open to building it with you as a technical partner.</p></div><div className="desktop-tags">{profile.skills.map(tag => <span key={tag}>{tag}</span>)}</div><button className="desktop-primary" onClick={() => open("contact")}>Let&apos;s make something <Glyph name="arrow" /></button></div></div>}
        {w.id === "contact" && <div className="desktop-window-content desktop-window-content--full"><div className="desktop-contact"><span className="desktop-eyebrow">MY INBOX IS OPEN</span><h2>Good things start<br /><em>with a hello.</em></h2><p>Need thumbnails or a developer for your next project — or have an idea worth building together? Tell me what you have in mind.</p><div>{contacts.map(contact => <a key={contact.short} href={contact.href} target={isExternal(contact.href) ? "_blank" : undefined} rel={isExternal(contact.href) ? "noreferrer noopener" : undefined}><span>{contact.icon}<strong>{contact.short}</strong></span><span>{contact.label}<Glyph name="arrow" /></span></a>)}</div><aside className="desktop-newsletter"><div><span>NEWSLETTER</span><b>SOON</b></div><h3>Ideas, experiments and things I&apos;m building.</h3><p>A quiet email about design, development, AI and building products from scratch.</p><div className="desktop-newsletter-field"><span>Your email</span><strong>Soon</strong></div></aside></div></div>}
      </div>
      {w.id !== "dev" && w.id !== "thumbnails" && w.id !== "design" && w.id !== "youtube" && <footer className="desktop-window-footer"><span>Matthew · Thumbnails & Development</span><span>Made with intention.</span></footer>}
    </section>)}

    <nav className="desktop-dock" aria-label="Application dock">
      <button className="dock-item dock-mobile-hidden" data-tooltip="Home" aria-label="Show desktop" onClick={showDesktop}><span className="dock-app dock-finder"><span>⌣</span></span></button>
      <button className="dock-item" data-tooltip="Photoshop" aria-label="Open Photoshop" onClick={() => open("thumbnails")} aria-current={isOpen("thumbnails") ? true : undefined}><span className="dock-app dock-photoshop"><AppIcon src="/tz/icons/ps.webp" alt="Photoshop" /></span></button>
      <button className="dock-item" data-tooltip="Figma" aria-label="Open Figma" onClick={() => open("design")} aria-current={isOpen("design") ? true : undefined}><span className="dock-app dock-figma"><AppIcon src="/tz/icons/figma.webp" alt="Figma" /></span></button>
      <button className="dock-item" data-tooltip="VS Code" aria-label="Open VS Code" onClick={() => open("dev")} aria-current={isOpen("dev") ? true : undefined}><span className="dock-app dock-vscode"><AppIcon src="/tz/icons/vscode.webp" alt="VS Code" /></span></button>
      <a className="dock-item dock-mobile-hidden dock-external" href="https://www.adventuregen.ai/" target="_blank" rel="noreferrer noopener" aria-label="Open Adventure AI in a new tab" data-tooltip="Adventure AI · Opens a new page"><span className="dock-app dock-adventure"><AppIcon src="/tz/icons/adventure-ai.webp" alt="Adventure AI" /></span></a>
      <button className="dock-item dock-mobile-hidden" data-tooltip="About me" aria-label="Open About me" onClick={() => open("about")} aria-current={isOpen("about") ? true : undefined}><span className="dock-app dock-notes"><span /><i /><i /><i /></span></button>
      <a className="dock-item dock-mobile-hidden dock-external" href="https://x.com/TzDev_" target="_blank" rel="noreferrer noopener" aria-label="Open X profile in a new tab" data-tooltip="X · Opens a new page"><span className="dock-app dock-x"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.6h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.9-7.6-6.7 7.6H.3l8.6-9.9L-.2 1.6h7.6l5.3 7 6.2-7zm-1.3 19.6h2L6.5 3.7H4.3l13.3 17.5z" /></svg></span></a>
      <button className="dock-item dock-mobile-hidden" data-tooltip="Let's talk" aria-label="Open Contact" onClick={() => open("contact")} aria-current={isOpen("contact") ? true : undefined}><span className="dock-app dock-mail"><Glyph name="mail" /></span></button>
      <button className="dock-item dock-mobile-hidden" data-tooltip="YouTube" aria-label="Open YouTube" onClick={() => open("youtube")} aria-current={isOpen("youtube") ? true : undefined}><span className="dock-app dock-youtube"><svg viewBox="0 0 24 24" fill="#fff"><path d="M9 7v10l8-5-8-5Z" /></svg></span></button>
      <div className="dock-item dock-popover-group">
        <button data-tooltip={musicOpen ? undefined : "Spotify"} aria-label="Open music player" aria-expanded={musicOpen} onClick={event => { event.stopPropagation(); setMusicOpen(o => !o); }}>
          <span className="dock-app dock-spotify"><AppIcon src="/tz/icons/spotify.webp" alt="Spotify" /></span>
        </button>
        {musicOpen && <div className="spotify-widget" onClick={event => event.stopPropagation()}>
          <iframe data-testid="embed-iframe" title="Work Flow Tz playlist on Spotify" style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/playlist/5kUYVjtt2pi4RZIIdJ2gDD?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          <a className="spotify-fallback" href="https://open.spotify.com/playlist/5kUYVjtt2pi4RZIIdJ2gDD" target="_blank" rel="noreferrer noopener">Open in Spotify <Glyph name="arrow" /></a>
        </div>}
      </div>
    </nav>
  </main>;
}
