import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin requests for local preview tunnels (like ngrok or localtunnel)
  serverExternalPackages: [],
  experimental: {
    // some next versions put it under experimental, but the latest puts it at root.
  },
  allowedDevOrigins: [
    "capable-hardening-yonder.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.loca.lt",
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "pub-760fa3db0e0e491da59597144b40ce1f.r2.dev",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Canonical domain — www → apex (Vercel + Next.js)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hiveschool.co" }],
        destination: "https://hiveschool.co/:path*",
        permanent: true,
      },
      // Legacy hiveschool.co paths (keep ads + bookmarks working)
      { source: "/privacy", destination: "/privacy-poliicy-2", permanent: true },
      { source: "/terms", destination: "/tnc-2", permanent: true },
      {
        source: "/sales-course-online-launchpad-program",
        destination: "/",
        permanent: true,
      },
      {
        source: "/apply-pgp-default",
        destination: "/pgp-revenue-tech-entrepreneurship",
        permanent: true,
      },
      {
        source: "/pgp",
        destination: "/pgp-revenue-tech-entrepreneurship",
        permanent: true,
      },
      {
        source: "/pgp/:path*",
        destination: "/pgp-revenue-tech-entrepreneurship/:path*",
        permanent: true,
      },
      {
        source: "/online-pgp",
        destination: "/fellowship-gtm-revenue-ai",
        permanent: true,
      },
      {
        source: "/online-pgp/:path*",
        destination: "/fellowship-gtm-revenue-ai/:path*",
        permanent: true,
      },
      { source: "/careers", destination: "/", permanent: false },
      { source: "/event-index", destination: "/", permanent: false },
      { source: "/event-index/:path*", destination: "/", permanent: false },
      { source: "/404-page", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
