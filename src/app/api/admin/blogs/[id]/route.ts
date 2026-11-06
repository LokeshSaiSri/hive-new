import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/mongodb";
import { Blog } from "@/lib/db/models/Blog";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const resolvedParams = await params;
    const body = await req.json();
    await connectDB();

    const blog = await Blog.findByIdAndUpdate(
      resolvedParams.id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);
    return NextResponse.json(blog);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const resolvedParams = await params;
    await connectDB();
    const blog = await Blog.findByIdAndDelete(resolvedParams.id);
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
