import { CoursePage } from "@/components/course/CoursePage";
import { CourseOverviewSchemas } from "@/lib/seo/page-schemas";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import type { ProgramSlug } from "@/data/programPages/types";

export function CourseOverviewPage({ slug }: { slug: ProgramSlug }) {
  return (
    <>
      <CourseOverviewSchemas slug={slug} />
      <CoursePage config={getCoursePageConfig(slug)} slug={slug} />
    </>
  );
}
