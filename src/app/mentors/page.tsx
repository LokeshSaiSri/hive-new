import type { Metadata } from "next";
import { MentorsHubPage } from "@/components/sitePages/MentorsHubPage";

export const metadata: Metadata = {
  title: "Mentors — HiveSchool",
  description:
    "Browse HiveSchool's operator mentor network — founders, CXOs, and GTM leaders across marketing, sales, and data.",
};

export default function MentorsPage() {
  return <MentorsHubPage />;
}
