import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { connectDB } from "@/lib/db/mongodb";
import { YoungCeoEntry } from "@/lib/db/models/YoungCeoEntry";
import { ENTRY_STATUSES, PAYMENT_STATUSES } from "@/lib/young-ceo/constants";

const PAGE_SIZE = 50;

function csvCell(value: unknown) {
  let s = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // block spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const payment = searchParams.get("payment") || "";
  const q = (searchParams.get("q") || "").trim().slice(0, 100);
  const format = searchParams.get("format");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const filter: Record<string, unknown> = {};
  if ((ENTRY_STATUSES as readonly string[]).includes(status)) filter.status = status;
  if ((PAYMENT_STATUSES as readonly string[]).includes(payment)) filter["payment.status"] = payment;
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { school: rx }];
  }

  try {
    await connectDB();

    if (format === "csv") {
      const all = await YoungCeoEntry.find(filter).sort({ createdAt: -1 }).lean();
      const headers = [
        "ID", "Submitted", "Name", "Email", "Phone", "School", "Age", "Pitch link", "Status",
        "Payment status", "Amount", "Currency", "Provider", "Payment reference", "Paid at", "Notes",
      ];
      const rows = all.map((r) =>
        [
          r._id, new Date(r.createdAt).toISOString(), r.name, r.email, r.phone, r.school, r.age, r.pitchUrl, r.status,
          r.payment?.status, r.payment?.amount, r.payment?.currency, r.payment?.provider, r.payment?.reference,
          r.payment?.paidAt ? new Date(r.payment.paidAt).toISOString() : "", r.notes,
        ].map(csvCell).join(","),
      );
      return new NextResponse([headers.join(","), ...rows].join("\n"), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="young-ceo-entries-${Date.now()}.csv"`,
        },
      });
    }

    const day = 24 * 60 * 60 * 1000;
    const [entries, total, stats] = await Promise.all([
      YoungCeoEntry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).lean(),
      YoungCeoEntry.countDocuments(filter),
      // Stats ignore the filters on purpose: they describe the whole challenge.
      YoungCeoEntry.aggregate([
        {
          $facet: {
            totals: [
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                  last24h: { $sum: { $cond: [{ $gte: ["$createdAt", new Date(Date.now() - day)] }, 1, 0] } },
                  last7d: { $sum: { $cond: [{ $gte: ["$createdAt", new Date(Date.now() - 7 * day)] }, 1, 0] } },
                  shortlisted: { $sum: { $cond: [{ $in: ["$status", ["shortlisted", "finalist"]] }, 1, 0] } },
                  paidCount: { $sum: { $cond: [{ $eq: ["$payment.status", "paid"] }, 1, 0] } },
                  revenue: { $sum: { $cond: [{ $eq: ["$payment.status", "paid"] }, "$payment.amount", 0] } },
                  pendingPayments: { $sum: { $cond: [{ $eq: ["$payment.status", "pending"] }, 1, 0] } },
                },
              },
            ],
            schools: [{ $group: { _id: { $toLower: { $trim: { input: "$school" } } } } }, { $count: "n" }],
            daily: [
              { $match: { createdAt: { $gte: new Date(Date.now() - 30 * day) } } },
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "Asia/Kolkata" } },
                  n: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]),
    ]);

    const f = stats[0] ?? {};
    const t = f.totals?.[0] ?? {};
    return NextResponse.json({
      entries,
      total,
      page,
      pages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
      stats: {
        total: t.total ?? 0,
        last24h: t.last24h ?? 0,
        last7d: t.last7d ?? 0,
        shortlisted: t.shortlisted ?? 0,
        paidCount: t.paidCount ?? 0,
        revenue: t.revenue ?? 0,
        pendingPayments: t.pendingPayments ?? 0,
        schools: f.schools?.[0]?.n ?? 0,
        daily: Object.fromEntries((f.daily ?? []).map((d: { _id: string; n: number }) => [d._id, d.n])),
      },
    });
  } catch (error) {
    console.error("Admin young-ceo GET:", error);
    return NextResponse.json({ error: "Failed to load entries" }, { status: 500 });
  }
}
