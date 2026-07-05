import type { Metadata } from "next";
import { CourseOverviewPage } from "@/components/course/CourseOverviewPage";
import { buildCourseOverviewMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildCourseOverviewMetadata("ai-marketing");

export default function AiMarketingPage() {
  return <CourseOverviewPage slug="ai-marketing" />;
}
