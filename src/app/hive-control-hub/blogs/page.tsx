"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AdminPageWrapper
      title="Blogs"
      subtitle="Manage your blog posts"
      actions={
        <Link
          href="/hive-control-hub/blogs/new"
          className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-4 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(30,68,226,0.3)] transition-all duration-200 hover:bg-light-blue"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M8 2v12M2 8h12" strokeLinecap="round" />
          </svg>
          New Blog
        </Link>
      }
    >
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="py-20 text-center text-sm text-white/40">
          No blogs created yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id} className="card-premium-dark rounded-2xl p-5 flex flex-col h-full">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${blog.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-white/30">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-white line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-white/50 line-clamp-2">
                  {blog.excerpt || "No excerpt"}
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
                <Link
                  href={`/hive-control-hub/blogs/${blog._id}`}
                  className="flex-1 rounded-lg bg-white/5 py-2 text-center text-xs font-medium text-white hover:bg-white/10"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 rounded-lg bg-red-500/10 py-2 text-center text-xs font-medium text-red-400 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminPageWrapper>
  );
}
