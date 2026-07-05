import type { Metadata } from "next";
import { ProgramTabPage } from "@/components/program/ProgramTabPage";
import { buildProgramTabMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildProgramTabMetadata("pgp", "curriculum");

export default function PgpCurriculumPage() {
  return <ProgramTabPage slug="pgp" tab="curriculum" />;
}
