import type { Metadata } from "next";
import { CampusHubPage } from "@/components/sitePages/CampusHubPage";

export const metadata: Metadata = {
  title: "Campus — HiveSchool",
  description:
    "Tour HiveSchool's Gurugram campus — learning zones, amenities, and full-time residential life.",
};

export default function CampusPage() {
  return <CampusHubPage />;
}
