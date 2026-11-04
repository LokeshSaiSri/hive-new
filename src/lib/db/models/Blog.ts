import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    content: { type: String, required: true }, // Markdown content
    coverImage: { type: String },
    author: { type: String, default: "Hive Admin" },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// We check if the model exists to prevent OverwriteModelError in Next.js dev server
export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
