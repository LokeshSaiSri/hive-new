import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db/mongodb";
import { YoungCeoEntry } from "@/lib/db/models/YoungCeoEntry";
import { validateEntry } from "@/lib/young-ceo/validate";

// Light in-memory rate limit: 6 submissions per IP per 15 minutes (per server instance).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function allowed(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 6) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!allowed(ip)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend success.
  if (body.website) return NextResponse.json({ ok: true });

  const result = validateEntry(body);
  if (!result.ok) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields: result.fields }, { status: 400 });
  }

  try {
    await connectDB();
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
    await YoungCeoEntry.create({ ...result.value, ipHash });
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "This email is already registered.", fields: { email: "This email is already registered." } },
        { status: 409 },
      );
    }
    console.error("Young CEO register error:", error);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
