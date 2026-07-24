import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/mongodb";
import { Event } from "@/lib/db/models/Event";
import { EventDetailPage } from "@/components/events/EventDetailPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectDB();
    const event = await Event.findOne({ slug, isPublished: true }).lean();
    if (!event) return { title: "Event Not Found — HiveSchool" };
    return {
      title: `${event.title} — HiveSchool Events`,
      description: event.tagline || event.description.slice(0, 160),
      robots: { index: false, follow: false },
    };
  } catch {
    return { title: "Event — HiveSchool" };
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;

  try {
    await connectDB();
    const event = await Event.findOne({ slug, isPublished: true }).lean();
    if (!event) notFound();

    // Serialize for client component
    const serialized = JSON.parse(JSON.stringify(event));
    return <EventDetailPage event={serialized} />;
  } catch {
    notFound();
  }
}
