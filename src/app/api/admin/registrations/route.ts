import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { connectDB } from "@/lib/db/mongodb";
import { Registration } from "@/lib/db/models/Registration";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get("eventId");
  const format = searchParams.get("format"); // "csv" for export
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 50;
  const skip = (page - 1) * limit;

  try {
    await connectDB();

    const filter = eventId ? { eventId } : {};
    const [registrations, total] = await Promise.all([
      Registration.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Registration.countDocuments(filter),
    ]);

    // CSV export
    if (format === "csv") {
      const allRegistrations = await Registration.find(filter).sort({ createdAt: -1 }).lean();
      const headers = ["Name", "Email", "Phone", "LinkedIn", "Event", "Registered At"];
      const rows = allRegistrations.map((r) => [
        `"${r.name}"`,
        `"${r.email}"`,
        `"${r.phone}"`,
        `"${r.linkedin}"`,
        `"${r.eventTitle}"`,
        `"${new Date(r.createdAt).toISOString()}"`,
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="hive-registrations-${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ registrations, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Admin registrations GET:", error);
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }
}
