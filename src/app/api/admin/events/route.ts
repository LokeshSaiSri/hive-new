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
    posterUrls?: string[];
    date?: string;
    endDate?: string;
    venue?: string;
    venueLink?: string;
    isOnline?: boolean;
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
    const title = body.title.trim();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const event = await Event.create({
      title,
      slug,
      tagline: body.tagline?.trim() || "",
      description: body.description.trim(),
      posterUrls: body.posterUrls ?? [],
      posterUrl: body.posterUrl || body.posterUrls?.[0] || "",
      date: new Date(body.date),
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      venue: body.venue.trim(),
      venueLink: body.venueLink || "",
      isOnline: body.isOnline ?? false,
      capacity: body.capacity,
      isPublished: body.isPublished ?? false,
      isFeatured: body.isFeatured ?? false,
      tags: body.tags ?? [],
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("Admin create event:", error);
    const message =
      error instanceof Error && error.message.includes("duplicate key")
        ? "An event with this title already exists"
        : error instanceof Error
        ? error.message
        : "Failed to create event";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
