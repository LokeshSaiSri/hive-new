import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES } from "@/lib/seo/routes";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
