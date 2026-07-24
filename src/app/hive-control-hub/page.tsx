"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

type Stats = {
  totals: { visitors: number; registrations: number; events: number };
  topEventsByRegistrations: Array<{ title: string; registrationCount: number; date: string; isPublished: boolean }>;
  recentRegistrationsByDay: Array<{ date: string; count: number }>;
};

function StatCard({ label, value, icon, color, href }: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  href?: string;
}) {
  const content = (
    <div className={`card-premium-dark rounded-2xl p-5 transition-all duration-300 ${href ? "hover:border-white/20 cursor-pointer" : ""}`}>
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          {icon}
        </div>
        {href && (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-white/30">
            <path d="M3 8h10M9 4.5L12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <p className="text-3xl font-bold text-white">{value.toLocaleString()}</p>
      <p className="mt-1 text-xs font-medium text-white/45">{label}</p>
    </div>
  );

  if (href) return <Link href={href}>{content}</Link>;
  return content;
}

function MiniBarChart({ data }: { data: Array<{ date: string; count: number }> }) {
  if (!data.length) return <p className="py-8 text-center text-sm text-white/30">No data yet</p>;

  const max = Math.max(...data.map((d) => d.count), 1);
  const last14 = data.slice(-14);

  return (
    <div className="flex h-20 items-end gap-1">
      {last14.map((d) => (
        <div key={d.date} className="group relative flex flex-1 flex-col items-center">
          <div
            className="w-full rounded-t-sm bg-gradient-to-t from-electric-blue to-blue-glow transition-all duration-300 group-hover:opacity-80"
            style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
          />
          <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded-lg bg-ink px-2 py-0.5 text-[9px] text-white group-hover:block">
            {d.count}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => {
        if (!r.ok) throw new Error("API failed");
        return r.json();
      })
      .then((data) => { setStats(data); setLoading(false); })
      .catch(() => { setStats(null); setLoading(false); });
  }, []);

  return (
    <AdminPageWrapper
      title="Dashboard"
      subtitle="Overview of your events and analytics"
      actions={
        <Link
          href="/hive-control-hub/events/new"
          className="inline-flex items-center gap-2 rounded-full bg-electric-blue px-4 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(30,68,226,0.3)] transition-all duration-200 hover:bg-light-blue"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <path d="M8 2v12M2 8h12" strokeLinecap="round" />
          </svg>
          New Event
        </Link>
      }
    >
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <StatCard
                label="Total Events"
                value={stats?.totals?.events ?? 0}
                color="bg-electric-blue/20"
                href="/hive-control-hub/events"
                icon={
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-blue-glow">
                    <rect x="2" y="3.5" width="16" height="14" rx="2" />
                    <path d="M2 8.5h16M6.5 1.5v4M13.5 1.5v4" strokeLinecap="round" />
                  </svg>
                }
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <StatCard
                label="Total Registrations"
                value={stats?.totals?.registrations ?? 0}
                color="bg-accent/20"
                href="/hive-control-hub/members"
                icon={
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-accent">
                    <circle cx="8" cy="6" r="3" />
                    <path d="M1 17c0-3.866 3.134-7 7-7s7 3.134 7 7" strokeLinecap="round" />
                    <path d="M15 3a3 3 0 010 6M19 17c0-2.761-1.79-5.11-4.33-5.838" strokeLinecap="round" />
                  </svg>
                }
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <StatCard
                label="Unique Page Visitors"
                value={stats?.totals?.visitors ?? 0}
                color="bg-blue-glow/20"
                href="/hive-control-hub/analytics"
                icon={
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-blue-glow">
                    <path d="M3 15l4-5 4 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 18h14" strokeLinecap="round" />
                  </svg>
                }
              />
            </motion.div>
          </div>

          {/* Charts row */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Registrations per day */}
            <div className="card-premium-dark rounded-2xl p-6">
              <h3 className="mb-1 text-sm font-bold text-white">Registrations — Last 14 Days</h3>
              <p className="mb-5 text-xs text-white/40">Daily registration count</p>
              <MiniBarChart data={stats?.recentRegistrationsByDay ?? []} />
            </div>

            {/* Top events */}
            <div className="card-premium-dark rounded-2xl p-6">
              <h3 className="mb-1 text-sm font-bold text-white">Top Events by Registrations</h3>
              <p className="mb-4 text-xs text-white/40">Ranked by total sign-ups</p>
              {(stats?.topEventsByRegistrations ?? []).length === 0 ? (
                <p className="py-6 text-center text-sm text-white/30">No events yet</p>
              ) : (
                <div className="space-y-3">
                  {(stats?.topEventsByRegistrations ?? []).map((event, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-4 text-xs font-bold text-white/30">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">{event.title}</p>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-electric-blue to-blue-glow"
                            style={{
                              width: `${Math.min(100, ((event.registrationCount) / Math.max(...(stats?.topEventsByRegistrations ?? [{ registrationCount: 1 }]).map((e) => e.registrationCount), 1)) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white/60">{event.registrationCount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Create Event", href: "/hive-control-hub/events/new", icon: "📅" },
              { label: "View Members", href: "/hive-control-hub/members", icon: "👥" },
              { label: "Analytics", href: "/hive-control-hub/analytics", icon: "📈" },
              { label: "Live Events Page", href: "/events", icon: "🔗", external: true },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/15 hover:bg-white/6 hover:text-white"
              >
                <span className="text-base">{action.icon}</span>
                {action.label}
                {action.external && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto h-3 w-3 text-white/30">
                    <path d="M2 10L10 2M5.5 2H10v4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
}
