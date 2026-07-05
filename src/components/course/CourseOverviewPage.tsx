import { CoursePage } from "@/components/course/CoursePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCoursePageConfig } from "@/data/coursePages/registry";
import type { ProgramSlug } from "@/data/programPages/types";
import { buildCourseSchema } from "@/lib/seo/schema";

export function CourseOverviewPage({ slug }: { slug: ProgramSlug }) {
  return (
    <>
      <JsonLd data={buildCourseSchema(slug)} />
      <CoursePage config={getCoursePageConfig(slug)} slug={slug} />
    </>
  );
}
