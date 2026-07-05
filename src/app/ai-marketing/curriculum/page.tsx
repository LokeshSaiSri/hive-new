import type { Metadata } from "next";
import { ProgramTabPage } from "@/components/program/ProgramTabPage";
import { buildProgramTabMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildProgramTabMetadata("ai-marketing", "curriculum");

export default function AiMarketingCurriculumPage() {
  return <ProgramTabPage slug="ai-marketing" tab="curriculum" />;
}
