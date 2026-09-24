export type PortfolioProject = {
  name: string;
  image?: string;
  type: string;
  url: string;
  description: string;
  featured?: boolean;
};

export const profile = {
  name: "Matthew",
  youtubeViews: "500M+",
  creators: "100+",
  adventureUsers: "50K+",
  intro: "I mix design and code to create thumbnails, websites and apps that people want to use.",
  about: [
    "I'm a designer and developer building at the intersection of visual storytelling and technology.",
    "My thumbnails have helped top creators earn more than 500 million views. Today, I also build digital products from the first sketch to the final deploy—including my own platform, Adventure AI.",
  ],
  skills: ["Thumbnail design", "Next.js", "React", "TypeScript", "React Native", "Google Cloud"],
};

export const devProjects: PortfolioProject[] = [
  { name: "Adventure AI", image: "adventure-ai", type: "AI web application", url: "https://www.adventuregen.ai/", description: "My main project. Designed and developed from interface to backend, end to end.", featured: true },
  { name: "Pose Studio", type: "3D pose generation tool", url: "https://www.adventuregen.ai/", description: "Built on an AI model I trained for thumbnails in 2025. Pose a 3D mannequin and it generates the perfect pose for any person." },
  { name: "Layers Studio", type: "Layered AI image generation", url: "https://www.adventuregen.ai/", description: "Generates images with every part as an editable layer. Make a scene with a car, then move just the car on its own." },
];

export const designProjects: PortfolioProject[] = [
  { name: "Adventure AI", image: "adventure-ai", type: "AI web application", url: "https://www.adventuregen.ai/", description: "My main project. Designed and developed from interface to backend, end to end.", featured: true },
  { name: "Clipping Hall of Fame", image: "clipping-hall-of-fame", type: "Content distribution platform", url: "https://www.clippinghalloffame.com/", description: "A platform that connects brands with clippers to distribute content and reach a wider audience." },
  { name: "Lowl · Harrison", image: "lowl", type: "Portfolio website", url: "https://lowl-portfolio.vercel.app/", description: "A portfolio designed and coded for thumbnail designer Harrison." },
  { name: "VivianPSD", image: "vivianpsd", type: "Portfolio website", url: "https://www.vivianpsd.com/", description: "A custom portfolio for thumbnail designer Vivian." },
];

export const timeline = [
  { year: "2019", text: "Moderated competitive Fortnite scrims on Brazil's biggest servers — FMS Scrim, 9Z Scrim, CFA Latam — and worked on large events like a Samsung camp and a 9z camp." },
  { year: "2021", text: "Started learning Photoshop and landed my first thumbnail clients in Brazil." },
  { year: "2022", text: "Taught myself to code, built my own site, and picked up my first web projects." },
  { year: "2023", text: "Focused full-time on thumbnail design and grew a much bigger client base." },
  { year: "2024", text: "Went back into code, this time building fast with AI-assisted vibe coding." },
  { year: "2025", text: "Launched Adventure AI, my own product." },
  { year: "2026", text: "Still doing websites and thumbnails, while growing Adventure AI past 50K users." },
];
