"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { PosterCarousel } from "@/components/events/PosterCarousel";
import { easeHive } from "@/lib/motion";
import { formatEventDate } from "@/lib/timezone";

type EventData = {
  _id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  posterUrl: string;
  posterUrls?: string[];
  date: string;
  endDate?: string;
  venue: string;
  venueLink?: string;
  isOnline?: boolean;
  capacity?: number;
  registrationCount: number;
  isFeatured: boolean;
  tags: string[];
};

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
}

// ============================================================================
// Featured Hero Card — sits beside hero copy
// ============================================================================
function FeaturedHeroCard({ event }: { event: EventData }) {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const date = formatEventDate(event.date);
  const isFull = event.capacity ? event.registrationCount >= event.capacity : false;
  const posters =
    event.posterUrls && event.posterUrls.length > 0
      ? event.posterUrls
      : event.posterUrl
      ? [event.posterUrl]
      : [];

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, x: 40, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md lg:max-w-none lg:justify-self-end"
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-electric-blue/20 blur-3xl"
        aria-hidden
      />

      <div
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/events/${event.slug}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/events/${event.slug}`);
          }
        }}
        className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1.5"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
          {posters.length > 0 ? (
            <PosterCarousel
              images={posters}
              alt={event.title}
              priority
              controls={posters.length > 1}
              className="absolute inset-0 h-full w-full"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#060f32] to-[#0a1542]" />
          )}

          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#020512] via-[#020512]/70 to-transparent" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-glow">
              Featured event
            </p>
            <h2 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
              {event.title}
            </h2>
            {event.tagline && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
                {event.tagline}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-white/60">
              <span>
                {date.day} {date.month} · {date.time}
              </span>
              <span className="truncate">{event.isOnline ? `Online · ${event.venue}` : event.venue}</span>
              {event.capacity != null && (
                <span className={isFull ? "text-red-400" : "text-white/50"}>
                  {isFull ? "Fully booked" : `${event.registrationCount}/${event.capacity} registered`}
                </span>
              )}
            </div>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-blue-glow">
              View event
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8h10M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Event Card Component (Glassmorphism & Spotlight)
// ============================================================================
function EventCard({ event, index }: { event: EventData; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const mousePosition = useMousePosition();

  const date = formatEventDate(event.date);
  const isFull = event.capacity ? event.registrationCount >= event.capacity : false;
  const spotsLeft = event.capacity ? event.capacity - event.registrationCount : null;
  const coverUrl =
    (event.posterUrls && event.posterUrls.find(Boolean)) || event.posterUrl || "";
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cardRef.current && isHovered) {
      const rect = cardRef.current.getBoundingClientRect();
      setLocalMouse({
        x: mousePosition.x - rect.left,
        y: mousePosition.y - rect.top,
      });
    }
  }, [mousePosition, isHovered]);

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeHive }}
      className="group"
    >
      <Link
        ref={cardRef}
        href={`/events/${event.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block h-full overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.05] transition-all duration-500 hover:-translate-y-2 hover:border-electric-blue/40"
      >
        {/* Dynamic Hover Spotlight */}
        {isHovered && !prefersReducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 300px at ${localMouse.x}px ${localMouse.y}px, rgba(30,68,226,0.15), transparent 80%)`,
            }}
          />
        )}

        <div className="relative z-10 flex h-full flex-col backdrop-blur-3xl">
          {/* Image Area */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-[2rem]">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#060f32] to-[#0a1542]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#060f32] via-[#060f32]/20 to-transparent opacity-80" />

            {/* Date Badge */}
            <div className="absolute left-5 top-5 overflow-hidden rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
              <div className="bg-electric-blue/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {date.month} {date.year}
              </div>
              <div className="bg-[#0a1542]/80 px-4 py-1.5 text-center">
                <span className="block text-2xl font-black leading-none text-white">{date.day}</span>
                <span className="block text-[10px] font-bold uppercase text-white/50 mt-1">{date.time}</span>
              </div>
            </div>

            {/* Featured Badge */}
            {event.isFeatured && (
              <div className="absolute right-5 top-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-accent backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex flex-1 flex-col p-6 sm:p-8">
            {event.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {event.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-xl font-bold leading-tight tracking-tight text-white group-hover:text-blue-glow transition-colors duration-300">
              {event.title}
            </h3>

            {event.tagline && (
              <p className="mt-3 text-sm leading-relaxed text-white/50 line-clamp-2">
                {event.tagline}
              </p>
            )}

            <div className="mt-auto pt-8">
              <div className="flex items-center gap-2 text-sm text-white/40 mb-5">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 shrink-0 text-white/60">
                  <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.485-2.015-4.5-4.5-4.5z" />
                  <circle cx="8" cy="6" r="1.5" />
                </svg>
                <span className="truncate font-medium">
                  {event.isOnline ? `Online · ${event.venue}` : event.venue}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                {spotsLeft !== null ? (
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Capacity</span>
                      <span className="text-[10px] font-bold text-white/60">
                        {isFull ? "Full" : `${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left`}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${isFull ? "bg-red-500" : spotsLeft < 10 ? "bg-accent" : "bg-gradient-to-r from-electric-blue to-blue-glow"
                          }`}
                        style={{
                          width: `${Math.min(100, (event.registrationCount / (event.capacity || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-blue-glow">
                      <path d="M10.5 5.5L5.5 10.5M5.5 5.5h5v5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Open Registration
                  </div>
                )}

                <div className="shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 group-hover:bg-electric-blue group-hover:border-electric-blue group-hover:shadow-[0_0_20px_rgba(30,68,226,0.5)]">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45">
                      <path d="M3 8h10M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================
export function EventsHubPage() {
  const prefersReducedMotion = useReducedMotion();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  const mousePosition = useMousePosition();

  // 3D Magnetic Button State
  const ctaRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [15, -15]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-15, 15]), { stiffness: 300, damping: 20 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

  // Removed FOMO Ticker per user request

  useEffect(() => {
    fetch("/api/events/list")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  const now = new Date();
  const filteredEvents = events.filter((e) => {
    const isPast = new Date(e.date) < now;
    if (filter === "upcoming") return !isPast;
    if (filter === "past") return isPast;
    return true;
  });

  // Prefer upcoming featured; fall back to any featured event
  const featuredEvent =
    events.find((e) => e.isFeatured && new Date(e.date) >= now) ||
    events.find((e) => e.isFeatured) ||
    null;

  return (
    <SitePageLayout>
      <div className="relative min-h-screen bg-[#040a22] selection:bg-electric-blue selection:text-white">

        {/* Dynamic Background Mesh (Nexus) */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020512]">
          {/* Networking Constellation SVG Overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="constellation" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="#4070ff" className="animate-pulse" />
                  <circle cx="80" cy="60" r="1.5" fill="#00ffff" />
                  <circle cx="50" cy="90" r="1" fill="#ffffff" opacity="0.5" />
                  <path d="M 20 20 L 80 60" stroke="rgba(64,112,255,0.15)" strokeWidth="0.5" />
                  <path d="M 80 60 L 50 90" stroke="rgba(0,255,255,0.1)" strokeWidth="0.5" />
                  <path d="M 50 90 L 20 20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#constellation)" />
            </svg>
          </div>

          <motion.div
            className="absolute top-[-30%] left-[-20%] h-[80vh] w-[80vw] rounded-[100%] bg-electric-blue/15 blur-[160px] mix-blend-screen"
            animate={{
              x: mousePosition.x * -0.02,
              y: mousePosition.y * -0.02,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] h-[70vh] w-[70vw] rounded-[100%] bg-blue-glow/15 blur-[140px] mix-blend-screen"
            animate={{
              x: mousePosition.x * 0.03,
              y: mousePosition.y * 0.03,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.8 }}
          />
          {/* Parallax 3D Orbs */}
          <motion.div
            className="absolute top-[20%] right-[15%] h-64 w-64 rounded-full border border-white/5 bg-gradient-to-br from-electric-blue/10 to-transparent backdrop-blur-3xl shadow-[0_0_80px_rgba(30,68,226,0.2)]"
            animate={{
              x: mousePosition.x * -0.05,
              y: mousePosition.y * -0.05,
              rotate: mousePosition.x * 0.01,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 1 }}
          />
          <motion.div
            className="absolute bottom-[30%] left-[5%] h-40 w-40 rounded-full border border-white/5 bg-gradient-to-tr from-blue-glow/10 to-transparent backdrop-blur-3xl shadow-[0_0_60px_rgba(0,255,255,0.1)]"
            animate={{
              x: mousePosition.x * 0.04,
              y: mousePosition.y * 0.04,
              scale: 1 + (mousePosition.y * 0.0001),
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 1.2 }}
          />

          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-48 pb-32 px-6 sm:px-12 lg:px-24 overflow-hidden">
          <div className="mx-auto max-w-7xl relative grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,420px)] lg:gap-16 xl:gap-20">

            {/* Left: copy + CTA */}
            <div className="min-w-0">
              {/* Magnetic/Glowing Border Tag */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: easeHive }}
                className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-md shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-glow opacity-80"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-glow shadow-[0_0_8px_#00ffff]"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">The Event Nexus</span>
              </motion.div>

              {/* Kinetic Staggered Typography */}
              <h1 className="text-5xl font-black leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem] relative z-10">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  Where ideas
                </motion.div>
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative inline-block"
                >
                  <span className="relative z-10 bg-gradient-to-r from-white via-[#b3c5ff] to-[#4070ff] bg-clip-text text-transparent">
                    come alive.
                  </span>
                  {/* Flowing Aurora behind text */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-glow via-electric-blue to-accent opacity-20 blur-2xl z-0 animate-pulse" />
                </motion.div>
              </h1>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easeHive }}
                className="mt-8 max-w-xl text-lg leading-relaxed text-white/50 sm:text-xl font-light tracking-wide"
              >
                Step into the nexus of innovation. Immerse yourself in masterclasses and high-velocity networking sessions built for the top 1% of founders.
              </motion.p>

              {/* Magnetic CTA Button & Avatars Area */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeHive }}
                className="mt-12 flex flex-col items-start gap-5"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 relative z-20">
                  <motion.button
                    ref={ctaRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                      const el = document.getElementById("events-grid");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{ transform }}
                    className="relative group overflow-visible rounded-full bg-electric-blue px-10 py-5 font-bold text-white shadow-[0_0_40px_rgba(30,68,226,0.4)] transition-all duration-200"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <span className="relative flex items-center gap-3">
                      Explore Masterclasses
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M3 8h10M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {/* Magnetic glowing drop shadow layer */}
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full bg-electric-blue blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
                      style={{ x: useTransform(mouseX, [-100, 100], [-10, 10]), y: useTransform(mouseY, [-100, 100], [-10, 10]) }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right: featured event card */}
            {featuredEvent ? (
              <FeaturedHeroCard event={featuredEvent} />
            ) : !loading ? (
              <div className="hidden lg:block" aria-hidden />
            ) : (
              <div className="hidden aspect-[3/4] w-full max-w-md animate-pulse rounded-[1.75rem] bg-white/5 lg:block lg:justify-self-end" />
            )}
          </div>
        </section>

        {/* Events Section */}
        <section id="events-grid" className="relative z-10 pb-40 px-6 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">

            {/* Fluid Filters */}
            <div className="mb-12 flex items-center justify-start border-b border-white/10 pb-6">
              <div className="flex gap-2 rounded-full bg-white/5 p-1.5 backdrop-blur-xl border border-white/10">
                {(["upcoming", "past", "all"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="relative px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    {filter === f && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 rounded-full bg-white text-ink"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 ${filter === f ? "text-ink" : "text-white/50 hover:text-white"}`}>
                      {f}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Grid */}
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/5] animate-pulse rounded-[2rem] bg-white/5" />
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <motion.div
                layout
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event, i) => (
                    <EventCard key={event._id} event={event} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_60px_rgba(30,68,226,0.15)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="h-10 w-10 text-white/30">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                    <path d="M15 9L9 15M9 9L15 15" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-white">No {filter} events</h3>
                <p className="mt-4 text-white/50 max-w-sm">
                  We{"'"}re brewing up something special. Check back soon or join our newsletter to stay updated.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </SitePageLayout>
  );
}
