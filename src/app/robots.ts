import type { MetadataRoute } from "next";
import { NOINDEX_PATH_PREFIXES, NOINDEX_PATH_SUFFIXES } from "@/lib/seo/routes";
import { absoluteUrl, getSiteHost } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        ...NOINDEX_PATH_PREFIXES,
        ...NOINDEX_PATH_SUFFIXES.map((suffix) => `/*${suffix}`),
      ],
    },
    host: getSiteHost(),
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
