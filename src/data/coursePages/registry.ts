import { aiMarketingCoursePage } from "@/data/coursePages/ai-marketing";
import { pgpCoursePage } from "@/data/coursePages/pgp";
import { ugCoursePage } from "@/data/coursePages/ug";
import type { CoursePageConfig } from "@/data/coursePages/types";
import type { ProgramSlug } from "@/data/programPages/types";

export const coursePageRegistry: Record<ProgramSlug, CoursePageConfig> = {
  pgp: pgpCoursePage,
  "ai-marketing": aiMarketingCoursePage,
  ug: ugCoursePage,
};

export function getCoursePageConfig(slug: ProgramSlug): CoursePageConfig {
  return coursePageRegistry[slug];
}
