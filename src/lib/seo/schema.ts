import { getCoursePageConfig } from "@/data/coursePages/registry";
import type { ProgramSlug } from "@/data/programPages/types";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  SOCIAL_PROFILES,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/seo/site";

function programPath(slug: ProgramSlug): string {
  return slug === "pgp" ? "/pgp-revenue-tech-entrepreneurship" : `/${slug}`;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${getSiteUrl()}/#organization`,
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/assets/images/hiveschool_logo.jpeg"),
    description: SITE_DEFAULT_DESCRIPTION,
    sameAs: [...SOCIAL_PROFILES],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: SITE_NAME,
    url: getSiteUrl(),
    description: SITE_DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function buildCourseSchema(slug: ProgramSlug) {
  const config = getCoursePageConfig(slug);
  const path = programPath(slug);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: config.programmeTitle,
    description: config.meta.description,
    url: absoluteUrl(path),
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${getSiteUrl()}/#organization`,
      name: SITE_NAME,
      url: getSiteUrl(),
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildGlobalSchemas() {
  return [buildOrganizationSchema(), buildWebsiteSchema()];
}
