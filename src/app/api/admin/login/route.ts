import { NextRequest, NextResponse } from "next/server";
import {
  signAdminToken,
  ADMIN_COOKIE_NAME,
  buildAdminCookieOptions,
} from "@/lib/admin/auth";

// Rate limit brute force: 5 attempts per 15 minutes per IP
const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.resetAt > now && entry.count >= 5) {
    return NextResponse.json(
      { error: "Too many login attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const adminSecret = process.env.ADMIN_SECRET_KEY;
  if (!adminSecret) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }

  if (body.password !== adminSecret) {
    // Record failed attempt
    if (!entry || entry.resetAt <= now) {
      attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    } else {
      entry.count++;
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Success — clear attempts and issue JWT cookie
  attempts.delete(ip);
  const token = signAdminToken();

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, buildAdminCookieOptions());
  return response;
}
