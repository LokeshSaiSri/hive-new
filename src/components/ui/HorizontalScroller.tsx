"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type HorizontalScrollerProps = {
  children: ReactNode;
  className?: string;
  slideClassName?: string;
  marquee?: boolean;
  /** When false, marquee keeps moving on hover (e.g. mentor cards). */
  marqueePauseOnHover?: boolean;
  marqueeSpeed?: "slow" | "normal" | "fast";
  autoplay?: boolean;
  autoplayDelay?: number;
  /** Align first slide with section container edge */
  bleed?: boolean;
};

export function HorizontalScroller({
  children,
  className = "",
  slideClassName = "",
  marquee = false,
  marqueePauseOnHover = true,
  marqueeSpeed = "normal",
  autoplay = false,
  autoplayDelay = 4000,
  bleed = true,
}: HorizontalScrollerProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAutoplay = autoplay && !prefersReducedMotion;

  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoplayDelay,
      playOnInit: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  const plugins = useMemo(
    () => (shouldAutoplay ? [autoplayPlugin.current] : []),
    [shouldAutoplay],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    shouldAutoplay
      ? {
          align: "start",
          loop: true,
          dragFree: false,
        }
      : {
          align: "start",
          loop: false,
          dragFree: false,
          containScroll: "trimSnaps",
        },
    plugins,
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    if (shouldAutoplay) autoplayPlugin.current.reset();
  }, [emblaApi, shouldAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    if (shouldAutoplay) autoplayPlugin.current.reset();
  }, [emblaApi, shouldAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    const handleResize = () => {
      emblaApi.reInit();
      handleSelect();
    };

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);
    emblaApi.on("resize", handleResize);

    const frame = requestAnimationFrame(handleSelect);

    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
      emblaApi.off("resize", handleResize);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !shouldAutoplay) return;

    const startAutoplay = () => {
      emblaApi.reInit();
      autoplayPlugin.current.play();
    };

    const frame = requestAnimationFrame(startAutoplay);
    return () => cancelAnimationFrame(frame);
  }, [emblaApi, shouldAutoplay]);

  const childArray = Array.isArray(children) ? children : [children];

  const marqueeSpeedClass = {
    slow: "animate-marquee-slow",
    normal: "animate-marquee",
    fast: "animate-marquee-fast",
  }[marqueeSpeed];

  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const [marqueeOverflows, setMarqueeOverflows] = useState(false);

  useLayoutEffect(() => {
    if (!marquee) return;

    const container = marqueeContainerRef.current;
    const track = marqueeTrackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const duplicated = track.childElementCount > childArray.length;
      const contentWidth = duplicated
        ? track.scrollWidth / 2
        : track.scrollWidth;
      setMarqueeOverflows(contentWidth > container.clientWidth + 2);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);

    return () => observer.disconnect();
  }, [marquee, childArray.length]);

  if (marquee) {
    const shouldAnimateMarquee =
      marqueeOverflows && !prefersReducedMotion;
    const items = shouldAnimateMarquee
      ? [...childArray, ...childArray]
      : childArray;

    return (
      <div
        ref={marqueeContainerRef}
        className={`overflow-hidden ${shouldAnimateMarquee ? "marquee-fade" : "flex justify-center"} ${className}`}
      >
        <div
          ref={marqueeTrackRef}
          className={`flex w-max gap-6 sm:gap-8 ${
            shouldAnimateMarquee
              ? `${marqueeSpeedClass} ${marqueePauseOnHover ? "" : "marquee-continuous"}`
              : ""
          }`}
        >
          {items.map((child, i) => (
            <div key={i} className={`shrink-0 ${slideClassName}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const paddingStart = bleed
    ? "pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
    : "";
  const paddingEnd = bleed
    ? "pr-4 sm:pr-6 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]"
    : "";

  const defaultBasis = "basis-[82%] sm:basis-[48%] lg:basis-[32%]";
  const slideGap = "mr-5 sm:mr-6";

  return (
    <div className={`relative ${className}`}>
      <div
        className={`overflow-hidden ${paddingStart} ${paddingEnd}`}
        ref={emblaRef}
      >
        <div className="flex">
          {childArray.map((child, i) => (
            <div
              key={i}
              className={`min-w-0 shrink-0 grow-0 ${slideGap} ${slideClassName || defaultBasis}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="section-container mt-5 hidden items-center justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!shouldAutoplay && !canScrollPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:bg-white disabled:pointer-events-none disabled:opacity-30"
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          disabled={!shouldAutoplay && !canScrollNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition hover:bg-white disabled:pointer-events-none disabled:opacity-30"
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
