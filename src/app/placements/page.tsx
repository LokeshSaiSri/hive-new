import type { Metadata } from "next";
import { PlacementsHubPage } from "@/components/sitePages/PlacementsHubPage";

export const metadata: Metadata = {
  title: "Placements — HiveSchool",
  description:
    "Placement archive, audited reports, salary distributions, and programme-specific hiring outcomes.",
};

export default function PlacementsPage() {
  return <PlacementsHubPage />;
}
