// Content for the VS Code workspace (VSCodeApp.tsx). Every number and claim here comes from the live product pages
// (adventuregen.ai, /thumbnails, /pose-studio, /layers-studio, motorizacnh.com) or from portfolio-data.ts. Nothing is
// estimated: if a project has no real metric, it simply shows fewer cards.
import { profile, timeline } from "./portfolio-data";

export type Media =
  | { kind: "video"; src: string; poster: string; label: string; ratio?: string; sound?: boolean }
  | { kind: "image"; src: string; label: string; ratio?: string; fit?: "cover" | "contain" };

export type Metric = { value: string; label: string };
export type Link = { label: string; href: string };

export type CaseStudy = {
  slug: string;
  file: string;
  index: string;
  featured?: boolean;
  name: string;
  tagline: string;
  category: string;
  status: string;
  url: string;
  links: Link[];
  tags: string[];
  metrics: Metric[];
  problem: string;
  built: string;
  role: string;
  stack: string[];
  features: { title: string; text: string }[];
  media: Media[];
  /** A real demo video, shown in its own section (Thumbnail Agent). */
  demo?: Media & { kind: "video"; note: string };
  /** A short, real example of how a session goes (Thumbnail Agent). */
  conversation?: { from: "you" | "agent"; text: string }[];
  terminal: string[];
};

export const projects: CaseStudy[] = [
  {
    slug: "adventure-ai",
    file: "adventure-ai.tsx",
    index: "01",
    featured: true,
    name: "Adventure AI",
    tagline: "Every model, one studio. An AI creative platform for images, thumbnails, upscales and edits, used by creators every day.",
    category: "AI SaaS",
    status: "Live in production",
    url: "https://www.adventuregen.ai/",
    links: [{ label: "Open adventuregen.ai", href: "https://www.adventuregen.ai/" }],
    tags: ["AI SaaS", "Product design", "Full-stack", "Payments", "Cloud"],
    metrics: [
      { value: profile.adventureUsers, label: "Users" },
      { value: "20+", label: "Image & video models" },
      { value: "16K", label: "Max upscale" },
    ],
    problem: "Creators juggle a different app for every model, and still can't fix what generation gets wrong: the light, the pose, the face, a single element in the frame.",
    built: "One workspace that runs Nano Banana Pro, GPT Image, Kling, Seedance and more, plus the tools that fix the rest: Upscaler, Relight, Pose Studio, Layers Studio, Motion Control, Face Swap and the Thumbnail Agent.",
    role: "Founder. I designed and built it end to end — interface, backend, payments, infrastructure and launch — and I've run every part of its tech since day one.",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "Redis queues", "Stripe", "Google Cloud", "fal.ai", "OpenAI"],
    features: [
      { title: "Every model in one place", text: "Image and video models side by side, with one credit balance." },
      { title: "Upscaler up to 16K", text: "Brings low-resolution images back sharp." },
      { title: "Relight & Pose Studio", text: "Direct the light and the pose instead of re-rolling prompts." },
      { title: "Thumbnail Agent", text: "An AI designer for YouTube thumbnails, inside Discord and Telegram." },
    ],
    media: [
      { kind: "video", src: "/projects/videos/adventure-ai-screen.mp4", poster: "/projects/videos/adventure-ai-screen-poster.webp", label: "Live site", ratio: "16 / 10" },
      { kind: "image", src: "/projects/adventure-ai.webp", label: "Home", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/thumbnails-2.webp", label: "Thumbnail Agent", ratio: "16 / 10" },
    ],
    terminal: [
      "> Loading Adventure AI...",
      "> Category: AI SaaS",
      `> Users: ${profile.adventureUsers.replace("K+", ",000+")}`,
      "> Models: 20+ image & video",
      "> Status: Production",
      "✓ Project loaded successfully",
    ],
  },
  {
    slug: "thumbnail-agent",
    file: "thumbnail-agent.tsx",
    index: "02",
    name: "Thumbnail Agent",
    tagline: "An AI thumbnail designer you talk to in Discord and Telegram. Send your video, approve a sketch, ask for changes — like working with a real designer.",
    category: "AI agent",
    status: "Live on Discord & Telegram",
    url: "https://www.adventuregen.ai/thumbnails",
    links: [
      { label: "Try the Thumbnail Agent", href: "https://www.adventuregen.ai/thumbnails" },
      { label: "Adventure AI on Discord", href: "https://discord.com/invite/X2jb79kK5u" },
    ],
    tags: ["AI agent", "Discord", "Telegram", "Multimodal", "Prompt pipelines"],
    metrics: [
      { value: "4", label: "Thumbnails per prompt" },
      { value: "100 MB", label: "Video input" },
      { value: "40 pages", label: "PDF briefs" },
    ],
    problem: "Most AI image tools make you write the perfect prompt. A good thumbnail designer doesn't work like that: they watch the video, pitch an idea, sketch it and keep refining with you.",
    built: "A conversational agent that works the way a designer does. It reads your video, script, voice note or PDF, pitches a concept, sends a black-and-white sketch for approval, paints the final thumbnail and keeps iterating on your feedback — right inside the chat.",
    role: "I designed the conversation, built the prompt and model pipeline behind each step, and shipped the Discord and Telegram integrations end to end.",
    stack: ["discord.js", "Telegram Bot API", "Node.js", "OpenAI", "Image models via fal.ai", "MongoDB"],
    features: [
      { title: "Talk to it naturally", text: "Describe the idea, react to the pitch, ask for changes in plain words." },
      { title: "Video, PDF or images", text: "Videos up to 100 MB and PDFs up to 40 pages guide the concept." },
      { title: "Your face, your references", text: "Tag a saved person with @name and point to references with #name." },
      { title: "Styles that stick", text: "IRL, Finance, Drawing and 3D presets — or a style built from 5 of your thumbnails." },
      { title: "Sketch before final", text: "A black-and-white sketch comes first, so the idea is right before it's painted." },
      { title: "Wide or tall", text: "The same thumbnail in 16:9 or 9:16, when you need both." },
    ],
    conversation: [
      { from: "you", text: "Make it look huge and scary" },
      { from: "agent", text: "Here's the sketch. Approve it?" },
      { from: "you", text: "Perfect, go!" },
      { from: "agent", text: "Done! Ready to upload." },
      { from: "you", text: "Make my shirt blue and turn the hole into a volcano" },
    ],
    demo: {
      kind: "video",
      src: "/projects/videos/thumbnail-agent-demo.mp4",
      poster: "/projects/videos/thumbnail-agent-demo-poster.webp",
      label: "Launch film",
      ratio: "16 / 9",
      sound: true,
      note: "The official launch film: references, styles, planning, and the agent working inside Discord.",
    },
    media: [
      { kind: "image", src: "/projects/shots/thumbnails-2.webp", label: "Idea to final", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/thumbnails-3.webp", label: "The chat", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/thumbnails-1.webp", label: "Product page", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/thumbnails-4.webp", label: "Features", ratio: "16 / 10" },
    ],
    terminal: [
      "> Loading Thumbnail Agent...",
      "> Category: AI agent",
      "> Channels: Discord, Telegram",
      "> Inputs: video · script · PDF · voice note",
      "> Flow: pitch → sketch → final → revisions",
      "✓ Agent online",
    ],
  },
  {
    slug: "pose-studio",
    file: "pose-studio.tsx",
    index: "03",
    name: "Pose Studio",
    tagline: "Any pose, your face. Pose a 3D mannequin, pick a saved person and get a photorealistic image of them in exactly that pose.",
    category: "AI tool · 3D",
    status: "Live in Adventure AI",
    url: "https://www.adventuregen.ai/pose-studio",
    links: [{ label: "Open Pose Studio", href: "https://www.adventuregen.ai/pose-studio" }],
    tags: ["3D", "Computer vision", "Image generation", "Interaction design"],
    metrics: [
      { value: "21", label: "Ready-made poses" },
      { value: "3", label: "Ways to pose" },
    ],
    problem: "Getting a specific pose out of an image model means guessing at prompts — and the person rarely looks the same twice.",
    built: "A 3D posing tool on top of generation: start from a preset, drag any joint, or strike the pose on your webcam and the mannequin copies you. The saved face stays the same from one pose to the next, and you set the light and background around it.",
    role: "I designed and built the posing tool and the generation flow. It runs on an AI model I trained for thumbnails in 2025.",
    stack: ["Three.js", "React Three Fiber", "MediaPipe", "Custom-trained image model", "React"],
    features: [
      { title: "Start from a preset", text: "21 poses, from hands on hips to sitting, running and kneeling." },
      { title: "Move any joint", text: "Head, spine, shoulders, hands, every finger, hips, knees and feet." },
      { title: "Copy it with your camera", text: "Hold a pose on your webcam and the mannequin matches it, hands included." },
      { title: "One face, every pose", text: "Save a person once and they stay consistent across poses." },
    ],
    media: [
      { kind: "image", src: "/projects/shots/pose-studio-1.webp", label: "Hands on hips", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/pose-studio-sitting.webp", label: "Sitting", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/pose-studio-2.webp", label: "Three ways to pose", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/pose-studio-3.webp", label: "One face, every pose", ratio: "16 / 10" },
    ],
    terminal: [
      "> Loading Pose Studio...",
      "> Category: AI tool · 3D",
      "> Poses: 21 presets + any joint + webcam",
      "> Status: Live in Adventure AI",
      "✓ Project loaded successfully",
    ],
  },
  {
    slug: "layers-studio",
    file: "layers-studio.tsx",
    index: "04",
    name: "Layers Studio",
    tagline: "Every image, now in layers. Drop in any image and the AI pulls it apart — background, every subject, every line of text — then export a PSD.",
    category: "AI tool · Editing",
    status: "Live in Adventure AI",
    url: "https://www.adventuregen.ai/layers-studio",
    links: [{ label: "Open Layers Studio", href: "https://www.adventuregen.ai/layers-studio" }],
    tags: ["Image editing", "Layered generation", "PSD export", "Interaction design"],
    metrics: [
      { value: "PSD", label: "Photoshop export" },
      { value: "2K", label: "Generation" },
      { value: "6", label: "References per prompt" },
    ],
    problem: "A generated image is flat: change one thing and everything else shifts, and any text in it is just pixels.",
    built: "An editor where each part of the image is its own layer. Ask for a change and it lands on that layer alone; text comes back as real, retypeable text; layers move like in Figma, keep every version, and open in Photoshop exactly as you left them.",
    role: "I designed the editor and built the layer pipeline, the canvas interactions and the PSD export.",
    stack: ["React", "Node.js", "ag-psd", "AI image models", "Canvas UI"],
    features: [
      { title: "Change one thing, keep the rest", text: "Edits land on a single layer; nothing else moves a pixel." },
      { title: "Text stays text", text: "Titles baked into an image come back as editable text." },
      { title: "Move like in Figma", text: "Drag, resize, rotate, and remove any background in one click." },
      { title: "Every version kept", text: "Each edit is a new version of the layer. Jump back anytime." },
    ],
    media: [
      { kind: "image", src: "/projects/shots/layers-studio-1.webp", label: "Product page", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/layers-studio-3.webp", label: "Change one thing", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/layers-studio-4.webp", label: "Open in Photoshop", ratio: "16 / 10" },
    ],
    terminal: [
      "> Loading Layers Studio...",
      "> Category: AI tool · Editing",
      "> Output: editable layers → PSD",
      "> Status: Live in Adventure AI",
      "✓ Project loaded successfully",
    ],
  },
  {
    slug: "motoriza",
    file: "motoriza.tsx",
    index: "05",
    name: "Motoriza",
    tagline: "A study app for the Brazilian driver's license theory test: short quiz levels, automatic review of mistakes and full mock exams.",
    category: "Mobile app · EdTech",
    status: "Live on Google Play",
    url: "https://www.motorizacnh.com/",
    links: [
      { label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.tzdev.motoriza" },
      { label: "motorizacnh.com", href: "https://www.motorizacnh.com/" },
    ],
    tags: ["Mobile app", "React Native", "EdTech", "Adaptive learning"],
    metrics: [
      { value: "12", label: "Levels covering the exam" },
      { value: "30", label: "Question mock exam" },
      { value: "15", label: "Free questions a day" },
    ],
    problem: "Studying for the theory test usually means expensive courses or weeks of memorizing a handbook without knowing if you're ready.",
    built: "A quiz-first study app: a level test, a track of short levels, an explanation after every answer, automatic review of the questions you missed, and a full mock exam in the official format. It tracks your history and estimates your real chance of passing.",
    role: "I designed and built the app, its website and the short videos that promote it.",
    stack: ["React Native", "Expo", "TypeScript"],
    features: [
      { title: "Learn the why", text: "Every question comes with a step-by-step explanation." },
      { title: "Automatic review", text: "Missed questions come back until they stick." },
      { title: "Car, motorcycle or both", text: "The track adapts to the license category." },
      { title: "Full mock exam", text: "30 questions, timed, with a report at the end." },
    ],
    media: [
      { kind: "image", src: "/projects/motoriza.webp", label: "Overview", ratio: "16 / 10" },
      { kind: "image", src: "/projects/shots/motoriza-1.webp", label: "Website", ratio: "16 / 10" },
      { kind: "image", src: "/tz/motoriza/Tela-Motoriza-1.png", label: "App screen 1", ratio: "16 / 10", fit: "contain" },
      { kind: "image", src: "/tz/motoriza/Tela-Motoriza-2.png", label: "App screen 2", ratio: "16 / 10", fit: "contain" },
    ],
    terminal: [
      "> Loading Motoriza...",
      "> Category: Mobile app · EdTech",
      "> Platform: Android (Google Play)",
      "> Content: 12 levels + full mock exam",
      "> Status: Live",
      "✓ Project loaded successfully",
    ],
  },
];

export type FileId = "readme" | "skills" | "experience" | "contact" | CaseStudy["slug"];

export type TreeItem = { id: FileId; name: string; kind: "md" | "tsx" | "json" };
export type TreeFolder = { folder: string; items: TreeItem[] };

export const tree: (TreeItem | TreeFolder)[] = [
  { id: "readme", name: "README.md", kind: "md" },
  { folder: "projects", items: projects.map((p) => ({ id: p.slug, name: p.file, kind: "tsx" as const })) },
  { folder: "about", items: [{ id: "skills", name: "skills.md", kind: "md" }, { id: "experience", name: "experience.md", kind: "md" }] },
  { id: "contact", name: "contact.json", kind: "json" },
];

export function fileName(id: FileId) {
  for (const node of tree) {
    if ("folder" in node) { const hit = node.items.find((i) => i.id === id); if (hit) return { ...hit, folder: node.folder }; }
    else if (node.id === id) return { ...node, folder: null as string | null };
  }
  return { id, name: String(id), kind: "md" as const, folder: null as string | null };
}

export const readme = {
  hello: `Hey, I'm ${profile.name}.`,
  role: "AI Product Builder & Creative Technologist.",
  line: "I build products, creative tools, and AI-powered workflows.",
  about: "I design and ship digital products end to end — interfaces, backends, automations and AI systems. I built Adventure AI from the first sketch to production, and before that spent years designing YouTube thumbnails for some of the biggest creators.",
  stats: [
    { value: profile.adventureUsers, label: "Adventure AI users" },
    { value: profile.youtubeViews, label: "Views on thumbnails I designed" },
    { value: profile.creators, label: "Creators worked with" },
  ],
  terminal: [
    `> Welcome to ${profile.name}'s workspace`,
    `> ${projects.length} projects in ./projects`,
    "> Tip: open a file in the Explorer",
    "✓ Workspace ready",
  ],
};

export const skills = {
  groups: [
    { title: "Product & AI", items: ["AI product design", "Agents & conversational flows", "Prompt and model pipelines", "Image & video generation", "Automation"] },
    { title: "Engineering", items: ["Next.js", "React", "TypeScript", "React Native", "Node.js", "MongoDB", "Google Cloud", "Three.js"] },
    { title: "Design", items: ["Thumbnail design", "Interface design", "Photoshop", "Figma", "Motion"] },
  ],
  terminal: ["> cat about/skills.md", `> ${profile.skills.length} core skills, 3 groups`, "✓ Done"],
};

export const experience = {
  timeline,
  terminal: ["> git log --oneline about/experience.md", `> ${timeline.length} entries, ${timeline[0].year}–${timeline[timeline.length - 1].year}`, "✓ Done"],
};

export const contactTerminal = ["> cat contact.json", "> Status: available for work", "✓ Inbox open"];
