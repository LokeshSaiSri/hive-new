import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { AdminBlogForm } from "@/components/admin/AdminBlogForm";
import { connectDB } from "@/lib/db/mongodb";
import { Blog } from "@/lib/db/models/Blog";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  await connectDB();
  
  let blog;
  try {
    blog = await Blog.findById(resolvedParams.id).lean();
  } catch (e) {
    // invalid id format
  }

  if (!blog) {
    notFound();
  }

  const initialData = {
    ...blog,
    _id: blog._id.toString(),
    publishedAt: blog.publishedAt?.toISOString(),
    createdAt: blog.createdAt?.toISOString(),
    updatedAt: blog.updatedAt?.toISOString(),
  };

  return (
    <AdminPageWrapper
      title="Edit Blog"
      subtitle="Update your blog post"
    >
      <div className="max-w-2xl">
        <AdminBlogForm mode="edit" initialData={initialData} />
      </div>
    </AdminPageWrapper>
  );
}
