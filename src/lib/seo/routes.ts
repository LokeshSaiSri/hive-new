import type { MetadataRoute } from "next";

type SitemapRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: string;
};

export const INDEXABLE_ROUTES: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: "2026-07-05" },
  {
    path: "/pgp-revenue-tech-entrepreneurship",
    changeFrequency: "weekly",
    priority: 0.95,
    lastModified: "2026-07-05",
  },
  {
    path: "/pgp-revenue-tech-entrepreneurship/curriculum",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-06-15",
  },
  {
    path: "/pgp-revenue-tech-entrepreneurship/placements",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-06-15",
  },
  {
    path: "/pgp-revenue-tech-entrepreneurship/admissions",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-06-15",
  },
  { path: "/ai-marketing", changeFrequency: "weekly", priority: 0.95, lastModified: "2026-07-05" },
  { path: "/ai-marketing/curriculum", changeFrequency: "monthly", priority: 0.85, lastModified: "2026-06-15" },
  { path: "/ai-marketing/admissions", changeFrequency: "monthly", priority: 0.85, lastModified: "2026-06-15" },
  { path: "/ug", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-07-05" },
  { path: "/placements", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-06-01" },
  { path: "/mentors", changeFrequency: "monthly", priority: 0.75, lastModified: "2026-05-01" },
  { path: "/campus", changeFrequency: "monthly", priority: 0.75, lastModified: "2026-05-01" },
  { path: "/privacy-poliicy-2", changeFrequency: "yearly", priority: 0.3, lastModified: "2025-01-01" },
  { path: "/tnc-2", changeFrequency: "yearly", priority: 0.3, lastModified: "2025-01-01" },
  { path: "/refund-policy-2", changeFrequency: "yearly", priority: 0.3, lastModified: "2025-01-01" },
];

export const NOINDEX_PATH_PREFIXES = [
  "/api/",
  "/download-placement-form",
] as const;

export const NOINDEX_PATH_SUFFIXES = ["-form-submitted"] as const;
