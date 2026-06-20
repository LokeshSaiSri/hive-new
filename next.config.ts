import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve /assets/* directly — avoids Netlify image-optimizer misses on static files.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
