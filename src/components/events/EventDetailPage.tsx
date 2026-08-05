"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
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

export function EventDetailPage({ event }: { event: EventData }) {
  const prefersReducedMotion = useReducedMotion();
  const hasFired = useRef(false);
  const date = formatEventDate(event.date);
  const isPast = new Date(event.date) < new Date();
  const isFull = event.capacity ? event.registrationCount >= event.capacity : false;
  const posters =
    event.posterUrls && event.posterUrls.length > 0
      ? event.posterUrls
      : event.posterUrl
      ? [event.posterUrl]
      : [];

  useEffect(() => {
    if (!hasFired.current) {
      hasFired.current = true;
      fetch("/api/events/track-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: event.slug, referrer: document.referrer }),
      }).catch(() => {});
    }
  }, [event.slug]);

  return (
    <SitePageLayout>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="hive-dark-band relative overflow-x-clip pb-0 pt-24 sm:pt-28 lg:pt-32">
        <div className="program-tab-hero__mesh pointer-events-none absolute inset-0" aria-hidden />
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />

        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: easeHive }}
            className="mb-8 flex items-center gap-2 text-sm text-white/40"
          >
            <Link href="/events" className="transition-colors hover:text-white/70">Events</Link>
            <span>/</span>
            <span className="text-white/60">{event.title}</span>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
            {/* Left: Event info */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeHive }}
            >
              {/* Poster(s) — first */}
              {posters.length > 0 && (
                <div className="relative mb-8 w-full overflow-hidden rounded-2xl bg-black/40 shadow-2xl">
                  <PosterCarousel
                    images={posters}
                    alt={event.title}
                    priority
                    layout="natural"
                    className="w-full"
                    sizes="(max-width: 1024px) 100vw, 760px"
                  />
                </div>
              )}

              {/* Tags */}
              {event.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full border border-blue-glow/20 bg-blue-glow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-glow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-bold text-white" style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                {event.title}
              </h1>

              {event.tagline && (
                <p className="mt-4 text-lg leading-relaxed text-white/65">{event.tagline}</p>
              )}

              {/* Meta info cards */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="card-premium-dark rounded-2xl p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                      <rect x="1" y="2.5" width="12" height="10" rx="1.5" />
                      <path d="M1 6.5h12M4.5 1v3M9.5 1v3" strokeLinecap="round" />
                    </svg>
                    Date & Time
                  </div>
                  <p className="text-sm font-semibold text-white">{date.full}</p>
                  <p className="mt-0.5 text-sm text-white/60">{date.time}</p>
                </div>

                <div className="card-premium-dark rounded-2xl p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                    {event.isOnline ? (
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                        <rect x="1.5" y="2.5" width="11" height="8" rx="1.5" />
                        <path d="M4.5 12.5h5M7 10.5v2" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                        <path d="M7 1C4.79 1 3 2.79 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z" />
                        <circle cx="7" cy="5" r="1.5" />
                      </svg>
                    )}
                    {event.isOnline ? "Online" : "Venue"}
                  </div>
                  {event.venueLink ? (
                    <a href={event.venueLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-glow hover:underline">
                      {event.venue}
                      {event.isOnline ? " — Join link" : ""}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-white">{event.venue}</p>
                  )}
                </div>

                {event.capacity && (
                  <div className="card-premium-dark rounded-2xl p-4 sm:col-span-2">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">Capacity</span>
                      <span className={`text-xs font-bold ${isFull ? "text-red-400" : "text-blue-glow"}`}>
                        {isFull ? "Fully Booked" : `${event.registrationCount} / ${event.capacity} registered`}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-electric-blue to-blue-glow"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (event.registrationCount / event.capacity) * 100)}%` }}
                        transition={{ duration: 1.2, delay: 0.4, ease: easeHive }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-10 pb-16">
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">About This Event</h2>
                <div className="prose prose-invert max-w-none">
                  {event.description.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-4 leading-relaxed text-white/70">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Registration form — sticky while scrolling event content */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: easeHive }}
              className="lg:sticky lg:top-28 lg:self-start lg:pb-16"
            >
              <EventRegistrationForm
                eventId={event._id}
                eventTitle={event.title}
                isPast={isPast}
                isFull={isFull}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
