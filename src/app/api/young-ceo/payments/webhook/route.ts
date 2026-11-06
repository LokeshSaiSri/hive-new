import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db/mongodb";
import { YoungCeoEntry } from "@/lib/db/models/YoungCeoEntry";
import { YoungCeoUnmatchedPayment } from "@/lib/db/models/YoungCeoUnmatchedPayment";

/*
 * Jodo payment webhook for the Young CEO Challenge.
 *   URL to register with Jodo: https://hiveschool.co/api/young-ceo/payments/webhook
 *   Verification (docs.jodo.in/webhooks/security): HMAC-SHA256 of the RAW body, hex,
 *   sent in the X-Jodo-Signature header. Secret: JODO_WEBHOOK_SECRET.
 *   Optional extra guard: JODO_CUSTOM_HEADER_NAME / JODO_CUSTOM_HEADER_VALUE.
 *
 * Handled events (anything else is acknowledged and ignored):
 *   payment_link.payment.debited  customer account debited (status "paid")  -> paid
 *   pay.payment.settled           settled to the bank (has a UTR)           -> paid
 *
 * To link a payment to a student we look, in order, for the entry's ID in a note,
 * identifier or custom identifier, then fall back to the payer's email.
 */

const EVENTS: Record<string, "paid"> = {
  "payment_link.payment.debited": "paid",
  "pay.payment.settled": "paid",
};

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

function parse(evt: Json) {
  const p: Json = evt.payload ?? {};
  const pay: Json = p.payment ?? {};
  const order: Json = p.order ?? {};
  const student: Json = p.student ?? {};

  const candidates = [
    student.custom_identifier, student.identifier, order.custom_identifier, order.identifier,
    ...(Array.isArray(order.notes) ? order.notes.map((n: Json) => n?.value) : []),
    typeof pay.notes === "string" ? pay.notes : null,
  ].filter((v): v is string => typeof v === "string");
  const entryId = candidates.map((v) => v.trim()).find((v) => mongoose.isValidObjectId(v) && v.length === 24) ?? null;

  const email = String(student.primary_contact_email || order.email || "").trim().toLowerCase() || null;

  let amount: number | undefined;
  if (typeof pay.amount === "number") amount = pay.amount;
  else if (Array.isArray(order.details)) amount = order.details.reduce((s: number, d: Json) => s + (Number(d.amount) || 0), 0);

  const utr = Array.isArray(pay.details) ? pay.details.find((d: Json) => d?.settlement_utr)?.settlement_utr : pay.settlement_utr;

  return {
    eventId: (evt.event_id as string) || null,
    entryId,
    email,
    amount, // assumed rupees: confirm with a real test payment
    reference: (pay.id || order.transaction_id || p.order_id || null) as string | null,
    utr: (utr as string) || null,
    paidAt: (pay.paid_at || order.paid_at || null) as string | null,
    orderStatus: order.status ? String(order.status).toLowerCase() : null,
  };
}

export async function POST(request: NextRequest) {
  const secret = process.env.JODO_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });

  const headerName = process.env.JODO_CUSTOM_HEADER_NAME;
  if (headerName && request.headers.get(headerName) !== process.env.JODO_CUSTOM_HEADER_VALUE) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const raw = await request.text();
  const sig = request.headers.get("x-jodo-signature") || "";
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  let evt: Json;
  try {
    evt = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  const status = EVENTS[evt.event as string];
  if (!status) return NextResponse.json({ ok: true, ignored: evt.event });

  const info = parse(evt);
  if (evt.event === "payment_link.payment.debited" && info.orderStatus && info.orderStatus !== "paid") {
    return NextResponse.json({ ok: true, ignored: `status ${info.orderStatus}` });
  }

  try {
    await connectDB();

    const entry = info.entryId
      ? await YoungCeoEntry.findById(info.entryId)
      : info.email
        ? await YoungCeoEntry.findOne({ email: info.email })
        : null;

    if (!entry) {
      console.warn("Jodo payment could not be matched to a Young CEO entry", info.eventId);
      await YoungCeoUnmatchedPayment.create({ eventId: info.eventId, event: evt });
      return NextResponse.json({ ok: true, unmatched: true }); // 200 so Jodo does not retry forever
    }

    const p = entry.payment;
    if (info.eventId && p.history.some((h: { eventId?: string | null }) => h.eventId === info.eventId)) {
      return NextResponse.json({ ok: true, duplicate: true });
    }

    p.status = status;
    p.provider = "jodo";
    p.reference = info.reference || p.reference;
    p.currency = "INR";
    if (info.amount !== undefined && info.amount > 0) p.amount = info.amount;
    if (!p.paidAt) {
      const d = info.paidAt ? new Date(info.paidAt) : null;
      p.paidAt = d && !Number.isNaN(d.getTime()) ? d : new Date();
    }
    if (info.utr) p.settlementUtr = info.utr;
    p.history.push({ at: new Date(), status, source: `jodo: ${evt.event}`, reference: info.reference, eventId: info.eventId });
    entry.markModified("payment");
    await entry.save();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Jodo webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 }); // non-2xx so Jodo retries
  }
}
