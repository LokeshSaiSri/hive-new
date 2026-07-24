import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { PageView } from "@/lib/db/models/PageView";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const page = (body.page as string) || "events";
    const referrer = (body.referrer as string) || "";

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const ua = request.headers.get("user-agent") || "";
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Anonymous fingerprint — no PII stored
    const visitorId = crypto
      .createHash("sha256")
      .update(`${ip}|${ua}|${date}`)
      .digest("hex")
      .slice(0, 32);

    await connectDB();

    // Upsert: one record per visitor per page per day
    await PageView.updateOne(
      { page, visitorId, date },
      { $setOnInsert: { page, visitorId, date, referrer } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch {
    // Silently ignore — tracking is best-effort
    return NextResponse.json({ ok: true });
  }
}
