// The receipts behind the Adventure AI growth story on /dev.
//
// Every number here was read off the live posts (X reports views, likes, reposts
// and bookmarks publicly). Nothing is estimated. If you refresh the counts, keep
// them raw — the formatting happens in `compact` so the totals never drift out of
// sync with the cards.
//
// Covers are the video thumbnails X serves for each post, pulled once and stored
// locally by scripts/optimize-x-posts.mjs.

export type XPost = {
  id: string;
  cover: string;
  alt: string;
  feature: string;
  /** The opening line of the post, as written. */
  hook: string;
  /** Why the post is built the way it is. This is the part that is strategy. */
  note: string;
  date: string;
  views: number;
  likes: number;
  saves: number;
  reposts: number;
};

export const xPosts: XPost[] = [
  {
    id: "2014689997035585729",
    cover: "/tz/adventure/x-01.webp",
    alt: "Adventure AI upscaler turning a pixelated cartoon frame sharp",
    feature: "Upscaler",
    hook: "If you work with images, this is a must",
    note: "Opens on the result, not the brand. The link sits behind a comment.",
    date: "23 Jan 2026",
    views: 116117,
    likes: 1313,
    saves: 1101,
    reposts: 77,
  },
  {
    id: "2018336635373387930",
    cover: "/tz/adventure/x-02.webp",
    alt: "Adventure AI Relight changing the lighting direction of a photo",
    feature: "Relight",
    hook: "Relight in Adventure AI is very good",
    note: "First Relight post. Plain claim, plain demo, used as the baseline.",
    date: "2 Feb 2026",
    views: 41374,
    likes: 705,
    saves: 643,
    reposts: 36,
  },
  {
    id: "2019020612854018129",
    cover: "/tz/adventure/x-03.webp",
    alt: "Adventure AI upscaler restoring detail in a blurred landscape photo",
    feature: "Upscaler",
    hook: "This upscaler is pure gold",
    note: "Names the tool designers already use and says where it loses. 191K views.",
    date: "4 Feb 2026",
    views: 191576,
    likes: 1741,
    saves: 1784,
    reposts: 117,
  },
  {
    id: "2023409296697115136",
    cover: "/tz/adventure/x-04.webp",
    alt: "Adventure AI upscaler running a low quality image to 4K",
    feature: "Upscaler",
    hook: "The future is 4K",
    note: "Comment 4K to get the link. The comment count is the point.",
    date: "16 Feb 2026",
    views: 46686,
    likes: 619,
    saves: 373,
    reposts: 31,
  },
  {
    id: "2025549886091858011",
    cover: "/tz/adventure/x-05.webp",
    alt: "Adventure AI upscaler sharpening a blurry image",
    feature: "Upscaler",
    hook: "This upscaler is insane",
    note: "The upscaler run peaked here. Same feature, hardest hook of the three.",
    date: "22 Feb 2026",
    views: 221066,
    likes: 1736,
    saves: 1798,
    reposts: 75,
  },
  {
    id: "2029898540705616375",
    cover: "/tz/adventure/x-06.webp",
    alt: "Adventure AI Relight turning a daytime photo into night",
    feature: "Relight",
    hook: "STOP and look at this",
    note: "An annual subscription given away in the comments to force the thread.",
    date: "6 Mar 2026",
    views: 44912,
    likes: 526,
    saves: 436,
    reposts: 28,
  },
  {
    id: "2032074624155205790",
    cover: "/tz/adventure/x-07.webp",
    alt: "Adventure AI Relight recoloring the light in an image",
    feature: "Relight",
    hook: "Relight is pure gold",
    note: "The upscaler hook, moved onto Relight. Formats travel between features.",
    date: "12 Mar 2026",
    views: 73513,
    likes: 991,
    saves: 1068,
    reposts: 61,
  },
  {
    id: "2033873733534748846",
    cover: "/tz/adventure/x-08.webp",
    alt: "Adventure AI Relight applied to an Oscars photo inside the app",
    feature: "Relight",
    hook: "USE RELIGHT NOW",
    note: "Three words, repeated five times. No pitch at all, and the best post of the run.",
    date: "17 Mar 2026",
    views: 450538,
    likes: 7352,
    saves: 4591,
    reposts: 205,
  },
  {
    id: "2043023930781323705",
    cover: "/tz/adventure/x-09.webp",
    alt: "Adventure AI Relight changing light direction and color on a portrait",
    feature: "Relight",
    hook: "This tool is insane",
    note: "Relight again, fifth time out, still clearing a quarter of a million views.",
    date: "11 Apr 2026",
    views: 258170,
    likes: 2665,
    saves: 2293,
    reposts: 175,
  },
  {
    id: "2061410681555931527",
    cover: "/tz/adventure/x-10.webp",
    alt: "Adventure AI Pose Studio posing a 3D figure to match a photo",
    feature: "Pose Studio",
    hook: "Designers, you should see this",
    note: "New feature, same opening move: show the job it does for a client.",
    date: "1 Jun 2026",
    views: 37688,
    likes: 508,
    saves: 629,
    reposts: 38,
  },
];

export const xTotals = xPosts.reduce(
  (acc, p) => ({
    views: acc.views + p.views,
    likes: acc.likes + p.likes,
    saves: acc.saves + p.saves,
    reposts: acc.reposts + p.reposts,
  }),
  { views: 0, likes: 0, saves: 0, reposts: 0 }
);

export function postUrl(id: string) {
  return `https://x.com/TzDev_/status/${id}`;
}

// 1481640 -> 1.48M, 450538 -> 451K, 41374 -> 41.4K. Two significant figures on
// millions so the total in the copy and the total on the page never disagree.
export function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 100_000) return `${Math.round(n / 1_000)}K`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export type IgPost = {
  url: string;
  /** Only used as the iframe title, so screen readers get more than "Instagram post 03". */
  label?: string;
};

// The company account. Instagram serves nothing to a logged-out reader, so there
// is no cover to pull and cache the way the X posts have one. These render through
// Instagram's own embed instead - see InstagramPosts.tsx.
export const igProfile = "https://www.instagram.com/adventuregen.ai/";

// https://www.instagram.com/p/CODE/?img_index=1 -> .../p/CODE/embed/captioned/
// The query has to go: the embed route ignores it and keeping it breaks the path.
export function igEmbedUrl(url: string) {
  return `${url.split("?")[0].replace(/\/$/, "")}/embed/captioned/`;
}

export const igPosts: IgPost[] = [
  { url: "https://www.instagram.com/p/DVMuTvVkTJy/?img_index=1" },
  { url: "https://www.instagram.com/p/DU5_Vb5kaNT/?img_index=1" },
  { url: "https://www.instagram.com/p/DTKzw3sETOQ/?img_index=1" },
  { url: "https://www.instagram.com/p/DO1EuX-kZSq/?img_index=1" },
  { url: "https://www.instagram.com/p/DMplwGEuPfP/?img_index=1" },
];
