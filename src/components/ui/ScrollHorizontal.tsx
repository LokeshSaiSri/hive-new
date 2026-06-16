"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const TRACK_PADDING =
  "pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+2rem))] lg:pr-[max(1.5rem,calc((100vw-80rem)/2+2rem))]";

type ScrollHorizontalProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** >1 lengthens the pin for a slower horizontal feel */
  durationScale?: number;
  label?: string;
};

export function ScrollHorizontal({
  children,
  className = "",
  trackClassName = "",
  durationScale = 1,
  label,
}: ScrollHorizontalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [metrics, setMetrics] = useState({ distance: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (progress) => {
    return -progress * metrics.distance;
  });

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const viewport = window.innerWidth;
      const trackWidth = track.scrollWidth;
      const distance = Math.max(0, trackWidth - viewport);
      const height = Math.max(
        window.innerHeight,
        Math.round((distance + window.innerHeight) * durationScale),
      );
      setMetrics({ distance, height });
    };

    measure();
    const raf = requestAnimationFrame(measure);

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    const images = track.querySelectorAll("img");
    const onImageLoad = () => measure();
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImageLoad);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      images.forEach((img) => img.removeEventListener("load", onImageLoad));
    };
  }, [children, durationScale]);

  if (prefersReducedMotion) {
    return (
      <div className={`overflow-x-auto ${TRACK_PADDING} ${className}`}>
        <div className={`flex gap-6 pb-2 ${trackClassName}`}>{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative isolate ${className}`}
      style={{ height: metrics.height > 0 ? metrics.height : "100svh" }}
    >
      <div className="sticky top-0 z-0 flex h-svh flex-col overflow-hidden">
        {label && (
          <div className="section-container shrink-0 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-mid-gray">
              {label}
            </p>
          </div>
        )}

        <div className="flex min-h-0 flex-1 items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className={`flex w-max items-stretch gap-6 ${TRACK_PADDING} ${trackClassName}`}
          >
            {children}
          </motion.div>
        </div>

        {metrics.distance > 0 && (
          <div className="section-container shrink-0 pb-8">
            <div className="h-0.5 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                className="h-full rounded-full bg-white"
                style={{ scaleX: scrollYProgress, transformOrigin: "left center" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
