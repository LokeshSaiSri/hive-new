import type { Metadata } from "next";
import { PlacementsHubPage } from "@/components/sitePages/PlacementsHubPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Placements — HiveSchool",
  description:
    "Placement archive, audited reports, salary distributions, and programme-specific hiring outcomes.",
  path: "/placements",
});

export default function PlacementsPage() {
  return <PlacementsHubPage />;
}
