"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

type EventRow = {
  _id: string;
  title: string;
  date: string;
  venue: string;
  registrationCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/events");
    const data = await res.json();
    setEvents(data.events || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(id: string, current: boolean) {
    setToggling(id);
    await fetch(`/api/admin/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !current }),
    });
    await load();
    setToggling(null);
  }

  async function deleteEvent(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  }

  return (
    <AdminPageWrapper
      title="Events"
      subtitle={`${events.length} event${events.length !== 1 ? "s" : ""} total`}
      actions={
        <Link
          href="/hive-control-hub/events/new"
          className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-4 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(30,68,226,0.3)] transition-all duration-200 hover:bg-light-blue"
        >
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
            <path d="M7 1v12M1 7h12" strokeLinecap="round" />
          </svg>
          New Event
        </Link>
      }
    >
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 text-white/20">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 10h18M8 2v4M16 2v4" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">No events yet</h3>
          <p className="mt-2 text-sm text-white/40">Create your first event to get started.</p>
          <Link
            href="/hive-control-hub/events/new"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-blue px-5 py-2.5 text-sm font-bold text-white"
          >
            Create Event →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/8 bg-white/3">
                {["Event", "Date", "Venue", "Registrations", "Status", "Actions"].map((col) => (
                  <th key={col} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr
                  key={event._id}
                  className={`border-b border-white/5 transition-colors hover:bg-white/3 ${
                    i % 2 === 0 ? "" : "bg-white/[0.015]"
                  }`}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {event.isFeatured && (
                        <span className="shrink-0 text-accent" title="Featured">★</span>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white line-clamp-1">{event.title}</p>
                        <p className="text-xs text-white/35">ID: {event._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-white/60">
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-xs text-white/35">
                      {new Date(event.date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="max-w-[140px] truncate text-xs text-white/60">{event.venue}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-full bg-electric-blue/15 px-2.5 text-xs font-bold text-blue-glow">
                      {event.registrationCount}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => togglePublish(event._id, event.isPublished)}
                      disabled={toggling === event._id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide transition-all duration-200 ${
                        event.isPublished
                          ? "bg-green-500/15 text-green-400 hover:bg-red-500/15 hover:text-red-400"
                          : "bg-white/8 text-white/40 hover:bg-electric-blue/15 hover:text-blue-glow"
                      } disabled:opacity-50`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${event.isPublished ? "bg-green-400" : "bg-white/30"}`} />
                      {event.isPublished ? "Live" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/hive-control-hub/events/${event._id}/edit`}
                        className="rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-white/25 hover:text-white"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/hive-control-hub/members?eventId=${event._id}`}
                        className="rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-white/60 transition-all hover:border-white/25 hover:text-white"
                      >
                        Members
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteEvent(event._id, event.title)}
                        disabled={deleting === event._id}
                        className="rounded-lg border border-red-400/20 px-3 py-1.5 text-xs font-medium text-red-400/60 transition-all hover:border-red-400/40 hover:text-red-400 disabled:opacity-40"
                      >
                        {deleting === event._id ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminPageWrapper>
  );
}
