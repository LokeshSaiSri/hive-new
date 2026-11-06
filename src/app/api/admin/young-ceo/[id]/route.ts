import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { connectDB } from "@/lib/db/mongodb";
import { YoungCeoEntry } from "@/lib/db/models/YoungCeoEntry";
import { ENTRY_STATUSES, PAYMENT_STATUSES } from "@/lib/young-ceo/constants";

type PatchBody = {
  status?: string;
  notes?: string;
  payment?: { status?: string; amount?: number; provider?: string; reference?: string };
};

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let body: PatchBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await connectDB();
    const entry = await YoungCeoEntry.findById(id);
    if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Whitelist: only these fields are ever editable from the admin.
    if (body.status !== undefined) {
      if (!(ENTRY_STATUSES as readonly string[]).includes(body.status)) {
        return NextResponse.json({ error: "Bad status" }, { status: 400 });
      }
      entry.status = body.status as (typeof ENTRY_STATUSES)[number];
    }
    if (body.notes !== undefined) entry.notes = String(body.notes).slice(0, 2000);

    if (body.payment) {
      const b = body.payment;
      const p = entry.payment;
      if (b.status !== undefined) {
        if (!(PAYMENT_STATUSES as readonly string[]).includes(b.status)) {
          return NextResponse.json({ error: "Bad payment status" }, { status: 400 });
        }
        if (b.status !== p.status) {
          p.history.push({ at: new Date(), status: b.status, source: "admin" });
          if (b.status === "paid" && !p.paidAt) p.paidAt = new Date();
        }
        p.status = b.status as (typeof PAYMENT_STATUSES)[number];
      }
      if (b.amount !== undefined) {
        const amt = Number(b.amount);
        if (!Number.isFinite(amt) || amt < 0 || amt > 10_000_000) {
          return NextResponse.json({ error: "Bad amount" }, { status: 400 });
        }
        p.amount = amt;
      }
      if (b.provider !== undefined) p.provider = b.provider ? String(b.provider).slice(0, 40) : null;
      if (b.reference !== undefined) p.reference = b.reference ? String(b.reference).slice(0, 100) : null;
      entry.markModified("payment");
    }

    await entry.save();
    return NextResponse.json({ entry: entry.toObject() });
  } catch (error) {
    console.error("Admin young-ceo PATCH:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
