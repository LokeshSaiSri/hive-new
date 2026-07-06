/** SEO-only Open Graph image paths — not used in visible UI. */
const HIVESCHOOL_OG_LOGO = "/assets/images/og/hiveschool-og.png";

export const OG_IMAGES = {
  default: HIVESCHOOL_OG_LOGO,
  home: HIVESCHOOL_OG_LOGO,
  pgp: HIVESCHOOL_OG_LOGO,
  aiMarketing: HIVESCHOOL_OG_LOGO,
  ug: HIVESCHOOL_OG_LOGO,
  fellowship: HIVESCHOOL_OG_LOGO,
  placements: HIVESCHOOL_OG_LOGO,
  mentors: HIVESCHOOL_OG_LOGO,
  campus: HIVESCHOOL_OG_LOGO,
} as const;

export function getOgImageForPath(path: string): string {
  if (path === "/") return OG_IMAGES.home;
  if (path.startsWith("/pgp-revenue-tech-entrepreneurship")) return OG_IMAGES.pgp;
  if (path.startsWith("/ai-marketing")) return OG_IMAGES.aiMarketing;
  if (path.startsWith("/fellowship-gtm-revenue-ai")) return OG_IMAGES.fellowship;
  if (path.startsWith("/ug")) return OG_IMAGES.ug;
  if (path === "/placements") return OG_IMAGES.placements;
  if (path === "/mentors") return OG_IMAGES.mentors;
  if (path === "/campus") return OG_IMAGES.campus;
  return OG_IMAGES.default;
}
