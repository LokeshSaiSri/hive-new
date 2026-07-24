import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { connectDB } from "@/lib/db/mongodb";
import { Event } from "@/lib/db/models/Event";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Admin events GET:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    title?: string;
    tagline?: string;
    description?: string;
    posterUrl?: string;
    date?: string;
    endDate?: string;
    venue?: string;
    venueLink?: string;
    capacity?: number;
    isPublished?: boolean;
    isFeatured?: boolean;
    tags?: string[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.title?.trim() || !body.description?.trim() || !body.date || !body.venue?.trim()) {
    return NextResponse.json(
      { error: "Title, description, date and venue are required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const event = await Event.create({
      title: body.title.trim(),
      tagline: body.tagline?.trim() || "",
      description: body.description.trim(),
      posterUrl: body.posterUrl || "",
      date: new Date(body.date),
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      venue: body.venue.trim(),
      venueLink: body.venueLink || "",
      capacity: body.capacity,
      isPublished: body.isPublished ?? false,
      isFeatured: body.isFeatured ?? false,
      tags: body.tags ?? [],
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Admin create event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
