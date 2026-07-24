import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Event } from "@/lib/db/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({ isPublished: true })
      .sort({ date: 1 })
      .lean();

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
