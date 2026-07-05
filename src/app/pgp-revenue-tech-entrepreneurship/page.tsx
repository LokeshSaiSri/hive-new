import type { Metadata } from "next";
import { CourseOverviewPage } from "@/components/course/CourseOverviewPage";
import { buildCourseOverviewMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildCourseOverviewMetadata("pgp");

export default function PgpPage() {
  return <CourseOverviewPage slug="pgp" />;
}
