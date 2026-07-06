import type { Metadata } from "next";
import { ProgramTabPage } from "@/components/program/ProgramTabPage";
import { buildProgramTabMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildProgramTabMetadata("fellowship-gtm-revenue-ai", "admissions");

export default function FellowshipGtmRevenueAiAdmissionsPage() {
  return <ProgramTabPage slug="fellowship-gtm-revenue-ai" tab="admissions" />;
}
