import type { Metadata } from "next";
import { MentorsHubPage } from "@/components/sitePages/MentorsHubPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { HubPageSchemas } from "@/lib/seo/page-schemas";

export const metadata: Metadata = buildPageMetadata({
  title: "Mentors — HiveSchool",
  description:
    "Browse HiveSchool's operator mentor network — founders, CXOs, and GTM leaders across marketing, sales, and data.",
  path: "/mentors",
});

export default function MentorsPage() {
  return (
    <>
      <HubPageSchemas
        name="Mentors — HiveSchool"
        description="Browse HiveSchool's operator mentor network — founders, CXOs, and GTM leaders across marketing, sales, and data."
        path="/mentors"
      />
      <MentorsHubPage />
    </>
  );
}
