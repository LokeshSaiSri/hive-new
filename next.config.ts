import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
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
        source: "/pgp-revenue-tech-entrepreneurship",
        destination: "/pgp",
        permanent: true,
      },
      {
        source: "/pgp-revenue-tech-entrepreneurship/:path*",
        destination: "/pgp",
        permanent: true,
      },
      {
        source: "/download-placement-form",
        destination: "/HiveSchool Placement Report 2025-26.pdf",
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
