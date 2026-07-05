/** SEO-only Open Graph image paths — not used in visible UI. */
export const OG_IMAGES = {
  default: "/assets/images/misc/hiveschool-logo.png",
  home: "/assets/images/life/admission-image.avif",
  pgp: "/assets/images/life/admission-image.avif",
  aiMarketing: "/assets/images/Website pics/d2c bazaar/DSC01796.jpeg",
  ug: "/assets/images/life/admission-image.avif",
  placements: "/assets/images/placement-reports/year-2-pdf-cover.jpg",
  mentors: "/assets/images/mentors/mansi-kumar.jpg",
  campus: "/assets/images/life/gym-hiveschool.jpg",
} as const;

export function getOgImageForPath(path: string): string {
  if (path === "/") return OG_IMAGES.home;
  if (path.startsWith("/pgp-revenue-tech-entrepreneurship")) return OG_IMAGES.pgp;
  if (path.startsWith("/ai-marketing")) return OG_IMAGES.aiMarketing;
  if (path.startsWith("/ug")) return OG_IMAGES.ug;
  if (path === "/placements") return OG_IMAGES.placements;
  if (path === "/mentors") return OG_IMAGES.mentors;
  if (path === "/campus") return OG_IMAGES.campus;
  return OG_IMAGES.default;
}
