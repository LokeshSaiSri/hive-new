import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getPresignedUploadUrl, getMimeType } from "@/lib/r2/upload";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { filename?: string; contentType?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const filename = body.filename || "poster.jpg";
  const contentType = body.contentType || getMimeType(filename);

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(contentType)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );
  }

  try {
    const { uploadUrl, publicUrl, key } = await getPresignedUploadUrl(filename, contentType);
    return NextResponse.json({ uploadUrl, publicUrl, key });
  } catch (error) {
    console.error("R2 presign error:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
