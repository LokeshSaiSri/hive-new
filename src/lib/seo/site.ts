export const SITE_NAME = "HiveSchool";
export const SITE_DEFAULT_TITLE =
  "HiveSchool — India's Only Revenue Focused Business School";
export const SITE_DEFAULT_DESCRIPTION =
  "India's definitive education in revenue, marketing, and entrepreneurship — for people who intend to lead what drives every business.";
export const SITE_LOCALE = "en_IN";

export const DEFAULT_OG_IMAGE = "/assets/images/misc/hiveschool-logo.png";

export const SOCIAL_PROFILES = [
  "https://instagram.com/hiveschool.co",
  "https://www.youtube.com/@hiveschoolco",
  "https://linkedin.com/company/hiveschool",
] as const;

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hiveschool.co").replace(
    /\/$/,
    "",
  );
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export function getSiteHost(): string {
  return new URL(getSiteUrl()).host;
}
