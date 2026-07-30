import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400, // 31 days
    qualities: [75],
  },
  // /design was the old home of the thumbnail work. Keep it alive — the URL is
  // already out there in client threads and in the Unlayered feature.
  async redirects() {
    return [{ source: "/design", destination: "/thumbnails", permanent: true }];
  },
};

export default nextConfig;
