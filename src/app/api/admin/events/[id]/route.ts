import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { connectDB } from "@/lib/db/mongodb";
import { Event } from "@/lib/db/models/Event";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    await connectDB();

    const posterUrls = Array.isArray(body.posterUrls)
      ? (body.posterUrls as unknown[]).filter((u): u is string => typeof u === "string" && u.length > 0)
      : undefined;

    const $set: Record<string, unknown> = {};

    if (typeof body.title === "string") $set.title = body.title.trim();
    if (typeof body.tagline === "string") $set.tagline = body.tagline.trim();
    if (typeof body.description === "string") $set.description = body.description.trim();
    if (typeof body.venue === "string") $set.venue = body.venue.trim();
    if (typeof body.venueLink === "string") $set.venueLink = body.venueLink.trim();
    if (typeof body.isOnline === "boolean") $set.isOnline = body.isOnline;
    if (typeof body.isPublished === "boolean") $set.isPublished = body.isPublished;
    if (typeof body.isFeatured === "boolean") $set.isFeatured = body.isFeatured;
    if (Array.isArray(body.tags)) $set.tags = body.tags;
    if (body.capacity === null || body.capacity === undefined || body.capacity === "") {
      // leave capacity unchanged unless explicitly provided as number
    } else if (typeof body.capacity === "number") {
      $set.capacity = body.capacity;
    }

    if (typeof body.date === "string" && body.date) {
      $set.date = new Date(body.date);
    }
    if (body.endDate === "" || body.endDate === null || body.endDate === undefined) {
      $set.endDate = null;
    } else if (typeof body.endDate === "string") {
      $set.endDate = new Date(body.endDate);
    }

    if (posterUrls) {
      $set.posterUrls = posterUrls;
      $set.posterUrl = posterUrls[0] ?? "";
    } else if (typeof body.posterUrl === "string") {
      $set.posterUrl = body.posterUrl;
    }

    const event = await Event.findByIdAndUpdate(
      id,
      { $set },
      { new: true, runValidators: true, overwriteDiscriminatorKey: true }
    ).lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Admin update event:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await connectDB();
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin delete event:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
