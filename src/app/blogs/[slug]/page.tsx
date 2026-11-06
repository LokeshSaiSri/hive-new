import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { connectDB } from "@/lib/db/mongodb";
import { Blog } from "@/lib/db/models/Blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReadingProgress, StickySidebar } from "@/components/blogs/BlogClientElements";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug, isPublished: true }).lean();
  if (!blog) return { title: "Not Found | HiveSchool" };
  return {
    title: `${blog.title} | HiveSchool Insights`,
    description: blog.excerpt ?? `Read ${blog.title} on HiveSchool.`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt ?? "",
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
    },
  };
}

function readingTime(text: string) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectDB();

  const blog = await Blog.findOne({ slug, isPublished: true }).lean();
  if (!blog) notFound();

  const relatedBlogs = await Blog.find({ isPublished: true, _id: { $ne: blog._id } })
    .sort({ publishedAt: -1 })
    .limit(2)
    .lean();

  const publishedDate = new Date(blog.publishedAt ?? blog.createdAt).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );
  const mins = readingTime(blog.content);

  return (
    <>
      <ReadingProgress />
      <Nav />

      <main className="bg-cream min-h-screen">
        {/* ── Editorial Overlap Hero (dark top) ───────────────────────── */}
        {/* Extended padding bottom to create the dark canvas for the overlapping image */}
        <section className="hive-dark-band relative pt-32 pb-48 lg:pt-40 lg:pb-64 overflow-hidden z-0">
          <div className="section-container relative z-10 max-w-5xl mx-auto text-center">
            {/* Back link */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white mb-10 transition-colors duration-200"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" className="w-3.5 h-3.5">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Articles
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
              {blog.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-glow border border-blue-glow/20 bg-blue-glow/8 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tight leading-[1.05] text-white mb-10 max-w-4xl mx-auto">
              {blog.title}
            </h1>

            {/* Byline */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/45">
              <div className="flex items-center gap-2.5">
                {/* Avatar initials */}
                <span className="w-8 h-8 rounded-full premium-inset flex items-center justify-center text-xs font-bold text-white/70 shrink-0 shadow-lg">
                  {(blog.author ?? "H").charAt(0).toUpperCase()}
                </span>
                <span className="font-medium text-white/80">{blog.author ?? "Hive Editorial"}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
              <time dateTime={blog.publishedAt?.toISOString?.() ?? ""}>{publishedDate}</time>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 opacity-70">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3.5l2.5 1.5" strokeLinecap="round" />
                </svg>
                {mins} min read
              </span>
            </div>
          </div>
        </section>

        {/* ── Overlapping Cover Image ────────────────────────────────────── */}
        {blog.coverImage && (
          <div className="section-container max-w-6xl mx-auto relative z-10 -mt-32 lg:-mt-48 px-4">
            <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden premium-frame-dark shadow-[0_40px_80px_rgba(6,15,50,0.5)]">
              {/* Note: The premium-frame-dark class adds the metallic border and gradient, we just need to ensure the image sits nicely inside it */}
              <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] overflow-hidden bg-ink-deep">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Article Body (cream background — premium editorial) ────────── */}
        <div className="bg-cream">
          <div className={`section-container max-w-6xl mx-auto lg:py-24 ${blog.coverImage ? 'py-16' : 'py-16 -mt-16 relative z-10'}`}>
            <div className="flex flex-col lg:flex-row gap-14 xl:gap-20 items-start">

              {/* Main Article */}
              <article className="flex-1 min-w-0 w-full">
                <div
                  className="
                    prose prose-lg max-w-[68ch] mx-auto
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-ink
                    prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8
                    prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border-soft
                    prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                    prose-p:text-ink/80 prose-p:leading-[1.85] prose-p:text-[1.05rem]
                    prose-a:text-electric-blue prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-electric-blue/40
                    prose-ul:text-ink/75 prose-ol:text-ink/75
                    prose-li:leading-relaxed prose-li:my-1
                    prose-strong:text-ink prose-strong:font-semibold
                    prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-border-soft/50
                    prose-hr:border-border-soft
                  "
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-4xl font-bold mt-16 mb-8 text-ink tracking-tight" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-3xl font-bold mt-14 mb-5 text-ink tracking-tight pb-3 border-b border-border-soft" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-2xl font-bold mt-10 mb-4 text-ink tracking-tight" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-[1.05rem] text-ink/80 leading-[1.85] mb-6" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-electric-blue font-medium hover:underline decoration-electric-blue/40 underline-offset-4 transition-all" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-outside ml-5 text-ink/75 mb-6 space-y-2 text-[1.05rem] leading-relaxed" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-outside ml-5 text-ink/75 mb-6 space-y-2 text-[1.05rem] leading-relaxed" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-[3px] border-electric-blue pl-6 my-10 py-1 italic text-xl text-ink/70 font-light leading-relaxed"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, children, ...props }: any) =>
                        inline ? (
                          <code className="bg-surface-muted text-brand-blue px-1.5 py-0.5 rounded text-[0.875em] font-mono border border-border-soft" {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-ink-deep text-white/85 px-6 py-5 rounded-xl overflow-x-auto mb-6 text-sm font-mono shadow-xl border border-white/10">
                            <code {...props}>{children}</code>
                          </pre>
                        ),
                      img: ({ node, ...props }) => (
                        <span className="block my-10 rounded-2xl overflow-hidden shadow-xl border border-border-soft/50">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="w-full h-auto object-cover m-0" {...props} alt={props.alt ?? "Article image"} />
                        </span>
                      ),
                    }}
                  >
                    {blog.content}
                  </ReactMarkdown>
                </div>
              </article>

              {/* Sidebar — desktop only */}
              <aside className="lg:w-[280px] xl:w-[320px] shrink-0 hidden lg:block sticky top-32">
                {/* 
                  Instead of dark wrapper, we use the premium white card styling 
                  to sit seamlessly on the cream background 
                */}
                <div className="card-premium rounded-2xl p-6 lg:p-8">
                  <StickySidebar title={blog.title} />
                </div>
              </aside>
            </div>

            {/* Mobile Sidebar/CTA — below article */}
            <div className="lg:hidden mt-12 card-premium rounded-2xl p-6">
              <StickySidebar title={blog.title} />
            </div>
          </div>
        </div>

        {/* ── Read Next ─────────────────────────────────────────────────── */}
        {relatedBlogs.length > 0 && (
          <section className="section-band-dark py-20 lg:py-24">
            <div className="section-container max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-white shrink-0">
                  Keep Reading
                </h2>
                <span className="h-px flex-1 bg-white/10" />
                <Link
                  href="/blogs"
                  className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-200 shrink-0"
                >
                  View All →
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {relatedBlogs.map((related: any) => (
                  <Link
                    key={related._id}
                    href={`/blogs/${related.slug}`}
                    className="group flex gap-5 card-premium-dark rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(30,68,226,0.35)] hover:border-electric-blue/20"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-ink-deep">
                      {related.coverImage && (
                        <Image
                          src={related.coverImage}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-[1.05] transition-transform duration-500 opacity-80 group-hover:opacity-100"
                          sizes="112px"
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col justify-center min-w-0 py-1">
                      <div className="flex gap-2 mb-1.5">
                        {related.tags?.slice(0, 1).map((t: string) => (
                          <span key={t} className="text-[9px] font-bold uppercase tracking-[0.25em] text-blue-glow/60">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-glow transition-colors duration-200">
                        {related.title}
                      </h3>
                      <time className="mt-2 text-xs text-white/30">
                        {new Date(related.publishedAt ?? related.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
