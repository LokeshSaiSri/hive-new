import type { Metadata } from "next";
import { CampusHubPage } from "@/components/sitePages/CampusHubPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { HubPageSchemas } from "@/lib/seo/page-schemas";

export const metadata: Metadata = buildPageMetadata({
  title: "Campus — HiveSchool",
  description:
    "Tour HiveSchool's Gurugram campus — learning zones, amenities, and full-time residential life.",
  path: "/campus",
});

export default function CampusPage() {
  return (
    <>
      <HubPageSchemas
        name="Campus — HiveSchool"
        description="Tour HiveSchool's Gurugram campus — learning zones, amenities, and full-time residential life."
        path="/campus"
      />
      <CampusHubPage />
    </>
  );
}
