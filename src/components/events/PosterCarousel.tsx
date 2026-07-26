"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Props = {
  images: string[];
  alt: string;
  /** Applied to the outer sizing wrapper (e.g. absolute inset-0, aspect-video, rounded) */
  className?: string;
  sizes?: string;
  priority?: boolean;
  interval?: number;
  controls?: boolean;
};

export function PosterCarousel({
  images,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 800px",
  priority = false,
  interval = 4500,
  controls = true,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = images.filter(Boolean);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    setIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [count, paused, interval]);

  if (count === 0) return null;

  const safeIndex = ((index % count) + count) % count;
  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Inner frame always has real dimensions for next/image fill */}
      <div className="group relative h-full w-full overflow-hidden">
        {slides.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={count > 1 ? `${alt} — image ${i + 1}` : alt}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className="object-cover ease-out"
            style={{
              opacity: i === safeIndex ? 1 : 0,
              zIndex: i === safeIndex ? 1 : 0,
              transition: `opacity ${prefersReducedMotion ? 0 : 700}ms ease-out`,
            }}
            aria-hidden={i !== safeIndex}
          />
        ))}

        {count > 1 && controls && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(safeIndex - 1);
              }}
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M10 3.5L5.5 8l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(safeIndex + 1);
              }}
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/70"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M6 3.5L10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-md">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    go(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === safeIndex ? "w-5 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
