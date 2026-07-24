import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/mongodb";
import { Event } from "@/lib/db/models/Event";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { AdminEventForm } from "@/components/admin/AdminEventForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;

  if (!(await isAdminAuthenticated())) {
    notFound();
  }

  try {
    await connectDB();
    const event = await Event.findById(id).lean();
    if (!event) notFound();

    const serialized = JSON.parse(JSON.stringify(event));

    return (
      <AdminPageWrapper
        title="Edit Event"
        subtitle={event.title}
      >
        <div className="max-w-2xl">
          <AdminEventForm mode="edit" initialData={serialized} />
        </div>
      </AdminPageWrapper>
    );
  } catch {
    notFound();
  }
}
