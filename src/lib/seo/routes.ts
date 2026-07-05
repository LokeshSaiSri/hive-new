import type { MetadataRoute } from "next";

type SitemapRoute = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export const INDEXABLE_ROUTES: SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  {
    path: "/pgp-revenue-tech-entrepreneurship",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    path: "/pgp-revenue-tech-entrepreneurship/curriculum",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/pgp-revenue-tech-entrepreneurship/placements",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/pgp-revenue-tech-entrepreneurship/admissions",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  { path: "/ai-marketing", changeFrequency: "weekly", priority: 0.95 },
  { path: "/ai-marketing/curriculum", changeFrequency: "monthly", priority: 0.85 },
  { path: "/ai-marketing/admissions", changeFrequency: "monthly", priority: 0.85 },
  { path: "/ug", changeFrequency: "weekly", priority: 0.9 },
  { path: "/placements", changeFrequency: "weekly", priority: 0.8 },
  { path: "/mentors", changeFrequency: "monthly", priority: 0.75 },
  { path: "/campus", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy-poliicy-2", changeFrequency: "yearly", priority: 0.3 },
  { path: "/tnc-2", changeFrequency: "yearly", priority: 0.3 },
  { path: "/refund-policy-2", changeFrequency: "yearly", priority: 0.3 },
];

export const NOINDEX_PATH_PREFIXES = [
  "/api/",
  "/download-placement-form",
] as const;

export const NOINDEX_PATH_SUFFIXES = ["-form-submitted"] as const;
