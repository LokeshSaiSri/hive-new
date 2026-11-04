import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { AdminBlogForm } from "@/components/admin/AdminBlogForm";

export default function NewBlogPage() {
  return (
    <AdminPageWrapper
      title="Create Blog"
      subtitle="Write a new blog post"
    >
      <div className="max-w-2xl">
        <AdminBlogForm mode="create" />
      </div>
    </AdminPageWrapper>
  );
}
