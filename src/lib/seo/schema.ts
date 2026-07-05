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

function metaValue(
  config: ReturnType<typeof getCoursePageConfig>,
  label: string,
): string | undefined {
  return config.hero.meta?.find((item) => item.label === label)?.value;
}

function courseMode(format?: string): string | undefined {
  if (!format) return undefined;
  if (/full[- ]time/i.test(format)) return "full time";
  if (/part[- ]time/i.test(format)) return "part time";
  if (/online/i.test(format)) return "online";
  if (/on-campus|campus|residential/i.test(format)) return "onsite";
  return format.toLowerCase();
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
  const duration = metaValue(config, "Duration");
  const format = metaValue(config, "Format");
  const location = config.hero.location;
  const mode = courseMode(format);

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: config.programmeTitle,
    description: config.meta.description,
    url: absoluteUrl(path),
    inLanguage: "en-IN",
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${getSiteUrl()}/#organization`,
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    ...(duration ? { timeRequired: duration } : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: mode ?? "onsite",
      location: {
        "@type": "Place",
        name: location,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressCountry: "IN",
        },
      },
    },
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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

export function buildWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@id": `${getSiteUrl()}/#website`,
    },
    publisher: {
      "@id": `${getSiteUrl()}/#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function buildVideoSchema(input: {
  name: string;
  description: string;
  videoId: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: `https://img.youtube.com/vi/${input.videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${input.videoId}`,
    uploadDate: "2025-01-01",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/images/hiveschool_logo.jpeg"),
      },
    },
  };
}

export function buildGlobalSchemas() {
  return [buildOrganizationSchema(), buildWebsiteSchema()];
}

export function compactSchemas(
  schemas: Array<Record<string, unknown> | null | undefined>,
) {
  return schemas.filter(Boolean) as Record<string, unknown>[];
}
