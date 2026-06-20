import type { Metadata } from "next";
import { CourseOverviewPage } from "@/components/course/CourseOverviewPage";
import { aiMarketingCoursePage } from "@/data/coursePages/ai-marketing";

export const metadata: Metadata = {
  title: aiMarketingCoursePage.meta.title,
  description: aiMarketingCoursePage.meta.description,
};

export default function AiMarketingPage() {
  return <CourseOverviewPage slug="ai-marketing" />;
}
