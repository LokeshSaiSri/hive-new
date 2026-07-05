import type { Metadata } from "next";
import { ProgramTabPage } from "@/components/program/ProgramTabPage";
import { buildProgramTabMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildProgramTabMetadata("pgp", "admissions");

export default function PgpAdmissionsPage() {
  return <ProgramTabPage slug="pgp" tab="admissions" />;
}
