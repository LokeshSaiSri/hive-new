"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";

type Blog = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
};

export function FeaturedCarousel({ blogs }: { blogs: Blog[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // If there's only 1 featured post, don't show a carousel
  if (blogs.length === 1) {
    const featuredBlog = blogs[0];
    return (
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 mt-16 md:mt-24 mb-10 pb-20">
        <FeaturedCard blog={featuredBlog} isActive={true} />
      </div>
    );
  }

  return (
    <div className="relative z-20 w-full max-w-[100vw] overflow-hidden mt-16 md:mt-24 mb-10 pb-20">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex touch-pan-y" style={{ backfaceVisibility: "hidden" }}>
          {blogs.map((blog, index) => {
            const isActive = index === selectedIndex;
            return (
              <div 
                key={blog._id} 
                className="embla__slide flex-[0_0_90%] md:flex-[0_0_75%] lg:flex-[0_0_65%] min-w-0 px-3 md:px-6 transition-all duration-700 ease-out"
                style={{
                  opacity: isActive ? 1 : 0.4,
                  transform: isActive ? "scale(1)" : "scale(0.9)",
                }}
              >
                <FeaturedCard blog={blog} isActive={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mt-10">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? "bg-electric-blue scale-125 shadow-[0_0_10px_rgba(30,68,226,0.8)]" 
                : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ blog, isActive }: { blog: Blog; isActive: boolean }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className={`group block relative rounded-[2rem] p-[1px] overflow-hidden transition-all duration-700 ${
        isActive ? "hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(30,68,226,0.25)]" : "pointer-events-none"
      }`}
    >
      {/* Magic Border gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-500 ${
        isActive ? "from-white/20 via-transparent to-white/5 group-hover:from-electric-blue group-hover:via-blue-glow group-hover:to-transparent" : "from-white/5 to-transparent"
      }`} />
      
      <div className="relative bg-ink-deep/60 backdrop-blur-2xl rounded-[calc(2rem-1px)] h-full w-full p-4 lg:p-6 grid lg:grid-cols-[1fr_45%] gap-6 lg:gap-12 items-center shadow-2xl">
        
        {/* Text Content */}
        <div className="flex flex-col justify-between p-4 lg:pl-10 lg:py-10 order-2 lg:order-1">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white border border-white/20 bg-white/10 rounded-full backdrop-blur-md">
                Featured
              </span>
              {blog.tags?.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-glow/80 border border-blue-glow/20 bg-blue-glow/5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-5 transition-colors duration-300 ${isActive ? "group-hover:text-blue-glow" : ""}`}>
              {blog.title}
            </h2>

            <p className="text-base text-white/55 leading-relaxed line-clamp-3 mb-8">
              {blog.excerpt}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between pt-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/70">
                {(blog.author ?? "H").charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-white/80">{blog.author ?? "Hive Editorial"}</span>
            </div>
            <time dateTime={blog.publishedAt} className="text-white/40 font-mono text-xs">
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Glass Cover Image */}
        <div className="relative h-64 md:h-80 lg:h-[400px] w-full rounded-3xl overflow-hidden order-1 lg:order-2 shadow-2xl border border-white/10">
          {blog.coverImage ? (
            <>
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className={`object-cover transition-transform duration-1000 ${isActive ? "group-hover:scale-[1.05]" : ""}`}
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-3xl pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          )}
        </div>

      </div>
    </Link>
  );
}
