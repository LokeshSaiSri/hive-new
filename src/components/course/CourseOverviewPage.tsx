import { CoursePage } from "@/components/course/CoursePage";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import type { ProgramSlug } from "@/data/programPages/types";

export function CourseOverviewPage({ slug }: { slug: ProgramSlug }) {
  return <CoursePage config={getCoursePageConfig(slug)} slug={slug} />;
}
