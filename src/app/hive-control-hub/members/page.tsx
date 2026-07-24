"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

type Registration = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  eventTitle: string;
  eventId: string;
  createdAt: string;
};

type Meta = { total: number; page: number; pages: number };

function MembersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventIdFilter = searchParams.get("eventId") || "";
  const pageNum = parseInt(searchParams.get("page") || "1", 10);
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<{_id: string, title: string}[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [data, setData] = useState<Registration[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams({ page: pageNum.toString() });
    if (eventIdFilter) params.set("eventId", eventIdFilter);
    const res = await fetch(`/api/admin/registrations?${params}`);
    const json = await res.json();
    setData(json.registrations || []);
    setMeta({ total: json.total || 0, page: json.page || 1, pages: json.pages || 1 });
    setLoading(false);
  }

  useEffect(() => { load(); }, [eventIdFilter, pageNum]);

  useEffect(() => {
    fetch("/api/admin/events").then(r => r.json()).then(d => setEvents(d.events || []));
  }, []);

  async function exportCsv() {
    setExporting(true);
    const params = new URLSearchParams({ format: "csv" });
    if (eventIdFilter) params.set("eventId", eventIdFilter);
    const res = await fetch(`/api/admin/registrations?${params}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hive-registrations-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  }

  const filtered = search
    ? data.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.email.toLowerCase().includes(search.toLowerCase()) ||
          r.eventTitle.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <AdminPageWrapper
      title="Members"
      subtitle={`${meta.total} total registration${meta.total !== 1 ? "s" : ""}`}
      actions={
        <button
          type="button"
          onClick={exportCsv}
          disabled={exporting || meta.total === 0}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white disabled:opacity-40"
        >
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
            <path d="M7 1v8M4.5 6.5L7 9l2.5-2.5M2 11h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {exporting ? "Exporting…" : "Export CSV"}
        </button>
      }
    >
      {/* Search and Filters */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30">
            <circle cx="7" cy="7" r="5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or event…"
            className="w-full rounded-xl border border-white/12 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-white/25 outline-none focus:border-electric-blue/50"
          />
        </div>
        
        <div className="relative shrink-0 sm:w-64">
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-white/12 bg-white/5 py-2.5 pl-4 pr-4 text-sm text-white outline-none transition-colors hover:border-white/20 focus:border-electric-blue/50"
          >
            <span className="truncate">
              {eventIdFilter ? events.find(e => e._id === eventIdFilter)?.title || "All Events" : "All Events"}
            </span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-4 w-4 shrink-0 text-white/40 transition-transform ${filterOpen ? 'rotate-180' : ''}`}>
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {filterOpen && (
            <>
              {/* Invisible overlay to close dropdown when clicking outside */}
              <div className="fixed inset-0 z-40" onClick={() => setFilterOpen(false)} />
              
              {/* Dropdown Menu */}
              <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0a1542] shadow-2xl backdrop-blur-xl">
                <div className="max-h-60 overflow-y-auto py-1">
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/hive-control-hub/members");
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${!eventIdFilter ? 'bg-electric-blue/20 text-electric-blue font-bold' : 'text-white/70'}`}
                  >
                    All Events
                  </button>
                  {events.map((ev) => (
                    <button
                      key={ev._id}
                      type="button"
                      onClick={() => {
                        router.push(`/hive-control-hub/members?eventId=${ev._id}`);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${eventIdFilter === ev._id ? 'bg-electric-blue/20 text-electric-blue font-bold' : 'text-white/70'}`}
                    >
                      {ev.title}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {eventIdFilter && (
          <button
            type="button"
            onClick={() => router.push("/hive-control-hub/members")}
            className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/50 hover:text-white shrink-0"
          >
            Clear filter ✕
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-4">👥</p>
          <h3 className="text-lg font-bold text-white">No registrations yet</h3>
          <p className="mt-2 text-sm text-white/40">
            {search ? "No results match your search." : "Share your events page to start getting registrations!"}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  {["Name", "Email", "Phone", "LinkedIn", "Event", "Registered"].map((col) => (
                    <th key={col} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg, i) => (
                  <tr key={reg._id} className={`border-b border-white/5 transition-colors hover:bg-white/3 ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-white">{reg.name}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <a href={`mailto:${reg.email}`} className="text-xs text-blue-glow hover:underline">{reg.email}</a>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-white/60">{reg.phone}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      {reg.linkedin ? (
                        <a href={reg.linkedin.startsWith("http") ? reg.linkedin : `https://${reg.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-glow hover:underline truncate max-w-[120px] block">
                          {reg.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                        </a>
                      ) : (
                        <span className="text-xs text-white/25">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="max-w-[160px] truncate text-xs text-white/60">{reg.eventTitle}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-white/40">
                        {new Date(reg.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta.pages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => router.push(`/hive-control-hub/members?page=${p}${eventIdFilter ? `&eventId=${eventIdFilter}` : ""}`)}
                  className={`h-8 w-8 rounded-full text-xs font-bold transition-all ${
                    p === meta.page
                      ? "bg-electric-blue text-white"
                      : "text-white/40 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </AdminPageWrapper>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060f32]" />}>
      <MembersContent />
    </Suspense>
  );
}
