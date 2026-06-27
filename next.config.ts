import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
      // Legacy hiveschool.co paths (keep ads + bookmarks working)
      { source: "/privacy", destination: "/privacy-poliicy-2", permanent: true },
      { source: "/terms", destination: "/tnc-2", permanent: true },
      {
        source: "/sales-course-online-launchpad-program",
        destination: "/ai-marketing",
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
      { source: "/careers", destination: "/", permanent: false },
      { source: "/event-index", destination: "/", permanent: false },
      { source: "/event-index/:path*", destination: "/", permanent: false },
      { source: "/404-page", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
