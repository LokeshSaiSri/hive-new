import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Blog } from "@/lib/db/models/Blog";

const CLAUDE_WEBHOOK_SECRET = process.env.CLAUDE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    
    if (!CLAUDE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    if (!authHeader || authHeader !== `Bearer ${CLAUDE_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      publishedAt,
      isPublished,
      tags
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    await connectDB();

    // Create a slug if not provided
    const blogSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newBlog = new Blog({
      title,
      slug: blogSlug,
      excerpt: excerpt || "",
      content,
      coverImage: coverImage || "",
      author: author || "Claude AI",
      publishedAt: publishedAt || new Date(),
      isPublished: isPublished !== undefined ? isPublished : true,
      tags: tags || [],
    });

    await newBlog.save();

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });

  } catch (error) {
    console.error("Error in Claude Webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
