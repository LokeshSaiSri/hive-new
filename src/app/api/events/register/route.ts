import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Registration } from "@/lib/db/models/Registration";
import { Event } from "@/lib/db/models/Event";
import crypto from "crypto";

// Simple in-memory rate limit: max 3 per IP per 15 min
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^[+\d\s\-()]{7,20}$/.test(phone.trim());
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many registrations. Please try again later." },
      { status: 429 }
    );
  }

  let body: { eventId?: string; name?: string; email?: string; phone?: string; linkedin?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { eventId, name, email, phone, linkedin } = body;

  if (!eventId || !name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Name, email, phone and event are required" }, { status: 400 });
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  if (!validatePhone(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }

  try {
    await connectDB();

    const event = await Event.findById(eventId).lean();
    if (!event || !event.isPublished) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check capacity
    if (event.capacity && event.registrationCount >= event.capacity) {
      return NextResponse.json({ error: "This event is fully booked" }, { status: 409 });
    }

    // Hash IP for storage — no raw PII
    const ipHash = crypto.createHash("sha256").update(ip + Date.now().toString().slice(0, 8)).digest("hex").slice(0, 16);

    await Registration.create({
      eventId,
      eventTitle: event.title,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      linkedin: (linkedin || "").trim(),
      ipHash,
    });

    // Increment registration count
    await Event.findByIdAndUpdate(eventId, { $inc: { registrationCount: 1 } });

    return NextResponse.json({ ok: true, message: "Registration successful!" });
  } catch (error: unknown) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "You have already registered for this event" },
        { status: 409 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
