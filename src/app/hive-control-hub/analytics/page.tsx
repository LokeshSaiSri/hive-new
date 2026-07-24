"use client";

import { useEffect, useState } from "react";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";

type AnalyticsData = {
  visitorsByDay: Array<{ date: string; count: number }>;
  topEventsByRegistrations: Array<{ title: string; registrationCount: number }>;
  recentRegistrationsByDay: Array<{ date: string; count: number }>;
  totals: { visitors: number; registrations: number; events: number };
};

function LineChart({ data, color = "#1e44e2", label }: {
  data: Array<{ date: string; count: number }>;
  color?: string;
  label: string;
}) {
  if (!data.length) {
    return <p className="py-12 text-center text-sm text-white/30">No data available yet</p>;
  }

  const last30 = data.slice(-30);
  const max = Math.max(...last30.map((d) => d.count), 1);
  const W = 600;
  const H = 120;
  const pad = { top: 10, right: 10, bottom: 24, left: 30 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const points = last30.map((d, i) => ({
    x: pad.left + (i / Math.max(last30.length - 1, 1)) * innerW,
    y: pad.top + (1 - d.count / max) * innerH,
    date: d.date,
    count: d.count,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const fillD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(pad.top + innerH).toFixed(1)} L ${pad.left.toFixed(1)} ${(pad.top + innerH).toFixed(1)} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = pad.top + f * innerH;
          return (
            <g key={f}>
              <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x={pad.left - 4} y={y + 3} textAnchor="end" fontSize="8" fill="rgba(255,255,255,0.3)">
                {Math.round(max * (1 - f))}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={fillD} fill={`url(#grad-${label})`} />

        {/* Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots on data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill={color} opacity={0.8} />
        ))}

        {/* X axis labels (first, middle, last) */}
        {Array.from(new Set([0, Math.floor(last30.length / 2), last30.length - 1])).map((i) => {
          if (!points[i]) return null;
          return (
            <text key={i} x={points[i].x} y={H - 4} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.3)">
              {last30[i]?.date?.slice(5)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => {
        if (!r.ok) throw new Error("API failed");
        return r.json();
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setData(null); setLoading(false); });
  }, []);

  return (
    <AdminPageWrapper
      title="Analytics"
      subtitle="Visitor traffic and registration trends — last 30 days"
    >
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Total Unique Visitors", value: data?.totals?.visitors ?? 0, icon: "👁️", color: "text-blue-glow" },
              { label: "Total Registrations", value: data?.totals?.registrations ?? 0, icon: "📝", color: "text-accent" },
              { label: "Total Events", value: data?.totals?.events ?? 0, icon: "📅", color: "text-white" },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="card-premium-dark rounded-2xl p-5">
                <p className="text-2xl">{icon}</p>
                <p className={`mt-2 text-3xl font-bold ${color}`}>{value.toLocaleString()}</p>
                <p className="mt-1 text-xs text-white/40">{label}</p>
              </div>
            ))}
          </div>

          {/* Visitors chart */}
          <div className="card-premium-dark rounded-2xl p-6">
            <h3 className="mb-1 text-sm font-bold text-white">Unique Page Visitors</h3>
            <p className="mb-5 text-xs text-white/40">One visitor per IP+device per day — privacy-safe</p>
            <LineChart data={data?.visitorsByDay ?? []} color="#869dff" label="visitors" />
          </div>

          {/* Registrations chart */}
          <div className="card-premium-dark rounded-2xl p-6">
            <h3 className="mb-1 text-sm font-bold text-white">Daily Registrations</h3>
            <p className="mb-5 text-xs text-white/40">New event sign-ups per day</p>
            <LineChart data={data?.recentRegistrationsByDay ?? []} color="#ffcf00" label="registrations" />
          </div>

          {/* Top events */}
          <div className="card-premium-dark rounded-2xl p-6">
            <h3 className="mb-1 text-sm font-bold text-white">Top Events by Registrations</h3>
            <p className="mb-5 text-xs text-white/40">All-time ranking</p>
            {(data?.topEventsByRegistrations ?? []).length === 0 ? (
              <p className="py-8 text-center text-sm text-white/30">No events yet</p>
            ) : (
              <div className="space-y-4">
                {(data?.topEventsByRegistrations ?? []).map((event, i) => {
                  const maxRegs = Math.max(...(data?.topEventsByRegistrations ?? []).map((e) => e.registrationCount), 1);
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-5 text-sm font-bold text-white/25">{i + 1}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-4 mb-1.5">
                          <p className="truncate text-sm font-semibold text-white">{event.title}</p>
                          <span className="shrink-0 text-xs font-bold text-blue-glow">{event.registrationCount}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-electric-blue to-blue-glow transition-all duration-700"
                            style={{ width: `${(event.registrationCount / maxRegs) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </AdminPageWrapper>
  );
}
