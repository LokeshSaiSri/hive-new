import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { AdminEventForm } from "@/components/admin/AdminEventForm";

export default function NewEventPage() {
  return (
    <AdminPageWrapper
      title="Create Event"
      subtitle="Add a new event to your events page"
    >
      <div className="max-w-2xl">
        <AdminEventForm mode="create" />
      </div>
    </AdminPageWrapper>
  );
}
