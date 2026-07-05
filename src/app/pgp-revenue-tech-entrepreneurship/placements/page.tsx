import type { Metadata } from "next";
import { ProgramTabPage } from "@/components/program/ProgramTabPage";
import { buildProgramTabMetadata } from "@/lib/seo/program-metadata";

export const metadata: Metadata = buildProgramTabMetadata("pgp", "placements");

export default function PgpPlacementsPage() {
  return <ProgramTabPage slug="pgp" tab="placements" />;
}
