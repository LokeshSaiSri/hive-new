import type { Metadata } from "next";
import { EventsHubPage } from "@/components/sitePages/EventsHubPage";

export const metadata: Metadata = {
  title: "Events — HiveSchool",
  description: "Join Hive's exclusive events — workshops, masterclasses, networking sessions, and more. Register now.",
  robots: { index: false, follow: false }, // noindex until officially launched
};

export default function EventsPage() {
  return <EventsHubPage />;
}
