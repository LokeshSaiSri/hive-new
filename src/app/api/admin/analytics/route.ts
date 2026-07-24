import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { connectDB } from "@/lib/db/mongodb";
import { PageView } from "@/lib/db/models/PageView";
import { Registration } from "@/lib/db/models/Registration";
import { Event } from "@/lib/db/models/Event";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Last 30 days visitor data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate = thirtyDaysAgo.toISOString().slice(0, 10);

    const [
      visitorsByDay,
      topEventsByRegistrations,
      recentRegistrationsByDay,
      totalVisitors,
      totalRegistrations,
      totalEvents,
    ] = await Promise.all([
      // Unique visitors per day (last 30 days)
      PageView.aggregate([
        { $match: { date: { $gte: startDate } } },
        { $group: { _id: "$date", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),

      // Top events by registration count
      Event.find()
        .sort({ registrationCount: -1 })
        .limit(5)
        .select("title registrationCount date isPublished")
        .lean(),

      // Registrations per day (last 30 days)
      Registration.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      PageView.countDocuments(),
      Registration.countDocuments(),
      Event.countDocuments(),
    ]);

    return NextResponse.json({
      visitorsByDay: visitorsByDay.map((v) => ({ date: v._id, count: v.count })),
      topEventsByRegistrations,
      recentRegistrationsByDay: recentRegistrationsByDay.map((r) => ({
        date: r._id,
        count: r.count,
      })),
      totals: { visitors: totalVisitors, registrations: totalRegistrations, events: totalEvents },
    });
  } catch (error) {
    console.error("Admin analytics GET:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
