import type { Metadata } from "next";
import { CourseOverviewPage } from "@/components/course/CourseOverviewPage";
import { buildCourseOverviewMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildCourseOverviewMetadata("ug");

export default function UgPage() {
  return <CourseOverviewPage slug="ug" />;
}
