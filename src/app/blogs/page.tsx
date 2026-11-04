import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { connectDB } from "@/lib/db/mongodb";
import { Blog } from "@/lib/db/models/Blog";
import Link from "next/link";
import Image from "next/image";
import { FeaturedCarousel } from "@/components/blogs/FeaturedCarousel";

export const metadata = {
  title: "Insights & Perspectives | HiveSchool",
  description:
    "Explore the latest insights, revenue strategies, and stories from the forefront of tech and GTM from the HiveSchool community.",
};

async function getBlogs() {
  await connectDB();
  const blogs = await Blog.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .lean();
  return blogs.map((blog: any) => ({
    ...blog,
    _id: blog._id.toString(),
    publishedAt: blog.publishedAt?.toISOString(),
  }));
}

export default async function BlogsPage() {
  const allBlogs = await getBlogs();
  
  // The Engine: Separate Featured vs Recent
  const featuredBlogs = allBlogs.filter(blog => blog.isFeatured);
  const recentBlogs = allBlogs.filter(blog => !blog.isFeatured);

  // Fallback: If nothing is manually featured, feature the absolute newest post
  if (featuredBlogs.length === 0 && recentBlogs.length > 0) {
    const fallback = recentBlogs.shift();
    if (fallback) featuredBlogs.push(fallback);
  }

  return (
    <>
      <Nav />

      {/* ── Cinematic Spotlight Hero (21st.dev Style) ────────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-start pt-36 lg:pt-48 overflow-hidden bg-ink-deep">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {/* Massive top spotlight */}
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-electric-blue/20 blur-[120px] rounded-[100%] mix-blend-screen" />
          <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-glow/15 blur-[100px] rounded-[100%] mix-blend-screen" />
        </div>

        {/* Typography Masterpiece */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-glow animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              Insights & Perspectives
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-white mb-8">
            Where Strategy <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-glow via-white to-electric-blue animate-pulse">
              Meets Mastery.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto font-light">
            Cutting-edge thinking on revenue, GTM, and technology — written by practitioners, for practitioners.
          </p>
        </div>

        {/* CoverFlow 3D Carousel for Featured Blogs */}
        {featuredBlogs.length > 0 && <FeaturedCarousel blogs={featuredBlogs} />}
      </section>

      {/* ── Recent Articles Grid ───────────────────────────────────────── */}
      <main className="section-band-dark pb-24 lg:pb-32 -mt-16">
        <div className="section-container">
          
          {recentBlogs.length === 0 && featuredBlogs.length === 0 && (
            <div className="card-premium-dark rounded-3xl p-16 text-center mt-32">
              <p className="text-xl font-semibold text-white/80 mb-2">No articles published yet.</p>
              <p className="text-sm text-white/40">Check back soon for elite strategies and insights.</p>
            </div>
          )}

          {recentBlogs.length > 0 && (
            <div className="pt-24 lg:pt-32">
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white shrink-0">
                  Latest Articles
                </h2>
                <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="flex flex-col gap-6 lg:gap-10">
                {/* 1. The Lead Block (Index 0) */}
                {recentBlogs[0] && (
                  <Link
                    href={`/blogs/${recentBlogs[0].slug}`}
                    className="group flex flex-col lg:flex-row relative rounded-3xl p-[1px] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(30,68,226,0.25)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent group-hover:from-electric-blue group-hover:via-blue-glow group-hover:to-transparent transition-colors duration-500" />
                    
                    <div className="relative flex flex-col lg:flex-row flex-1 bg-ink-deep/80 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] h-full overflow-hidden w-full">
                      <div className="relative lg:w-1/2 overflow-hidden bg-ink aspect-[16/10] lg:aspect-auto lg:border-r border-white/5">
                        {recentBlogs[0].coverImage && (
                          <Image
                            src={recentBlogs[0].coverImage}
                            alt={recentBlogs[0].title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-[1.05] opacity-90 group-hover:opacity-100"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        )}
                        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />
                      </div>

                      <div className="flex flex-col flex-1 p-8 lg:p-12 justify-center">
                        <div className="flex flex-wrap gap-2 mb-5">
                          {recentBlogs[0].tags?.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-glow bg-blue-glow/5 border border-blue-glow/20 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-bold text-white text-3xl lg:text-4xl leading-[1.1] mb-5 tracking-tight group-hover:text-blue-glow transition-colors duration-300">
                          {recentBlogs[0].title}
                        </h3>
                        <p className="text-base lg:text-lg text-white/50 leading-relaxed mb-8 flex-1 line-clamp-3">
                          {recentBlogs[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                          <div className="flex items-center gap-3 text-sm text-white/60 font-medium">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/80">
                              {(recentBlogs[0].author ?? "H").charAt(0).toUpperCase()}
                            </span>
                            {recentBlogs[0].author ?? "Hive Editorial"}
                          </div>
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-electric-blue/20 group-hover:border-electric-blue/50 transition-all duration-300">
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/40 group-hover:text-blue-glow group-hover:translate-x-1 transition-all duration-300">
                              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* 2. The Split Block (Index 1 & 2) */}
                {(recentBlogs[1] || recentBlogs[2]) && (
                  <div className="grid gap-6 lg:gap-10 md:grid-cols-2">
                    {recentBlogs.slice(1, 3).map((blog: any) => (
                      <Link
                        key={blog._id}
                        href={`/blogs/${blog.slug}`}
                        className="group flex flex-col relative rounded-3xl p-[1px] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(30,68,226,0.2)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent group-hover:from-electric-blue group-hover:via-blue-glow group-hover:to-transparent transition-colors duration-500" />
                        <div className="relative flex flex-col flex-1 bg-ink-deep/80 backdrop-blur-2xl rounded-[calc(1.5rem-1px)] h-full overflow-hidden">
                          <div className="relative overflow-hidden bg-ink w-full aspect-[16/10] border-b border-white/5">
                            {blog.coverImage && (
                              <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.08] opacity-85 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            )}
                            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />
                          </div>
                          <div className="flex flex-1 flex-col p-8 lg:p-10">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags?.slice(0, 2).map((tag: string) => (
                                <span key={tag} className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-blue-glow/80 bg-blue-glow/5 border border-blue-glow/20 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="font-bold text-white text-2xl lg:text-3xl leading-[1.15] tracking-tight mb-4 group-hover:text-blue-glow transition-colors duration-300">
                              {blog.title}
                            </h3>
                            <p className="text-sm lg:text-base text-white/50 leading-relaxed mb-8 flex-1 line-clamp-3">
                              {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
                              <div className="flex items-center gap-2 text-xs text-white/50 font-medium">
                                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-white/70">
                                  {(blog.author ?? "H").charAt(0).toUpperCase()}
                                </span>
                                {blog.author ?? "Hive Editorial"}
                              </div>
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-electric-blue/20 group-hover:border-electric-blue/50 transition-all duration-300">
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-glow group-hover:translate-x-0.5 transition-all duration-300">
                                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* 3. The Density Block (Index 3+) */}
                {recentBlogs.length > 3 && (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4 lg:mt-6">
                    {recentBlogs.slice(3).map((blog: any) => (
                      <Link
                        key={blog._id}
                        href={`/blogs/${blog.slug}`}
                        className="group flex flex-col relative rounded-3xl p-[1px] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(30,68,226,0.15)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent group-hover:from-electric-blue group-hover:via-blue-glow group-hover:to-transparent transition-colors duration-500" />
                        <div className="relative flex flex-col flex-1 bg-ink-deep/80 backdrop-blur-xl rounded-[calc(1.5rem-1px)] h-full overflow-hidden">
                          <div className="relative overflow-hidden bg-ink w-full aspect-[16/10] border-b border-white/5">
                            {blog.coverImage && (
                              <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.05] opacity-80 group-hover:opacity-100"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            )}
                            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none" />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {blog.tags?.slice(0, 1).map((tag: string) => (
                                <span key={tag} className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.25em] text-blue-glow/80 bg-blue-glow/5 border border-blue-glow/20 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <h3 className="font-bold text-white text-lg leading-snug mb-3 group-hover:text-blue-glow transition-colors duration-300 line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="text-xs text-white/45 leading-relaxed mb-5 flex-1 line-clamp-2">
                              {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                              <div className="text-[10px] text-white/50 font-medium">
                                {blog.author ?? "Hive Editorial"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
