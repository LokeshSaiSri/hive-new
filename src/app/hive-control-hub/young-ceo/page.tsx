"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageWrapper } from "@/components/admin/AdminPageWrapper";
import { ENTRY_STATUSES, PAYMENT_STATUSES } from "@/lib/young-ceo/constants";

type Payment = {
  status: string;
  amount: number;
  currency: string;
  provider: string | null;
  reference: string | null;
  paidAt: string | null;
  settlementUtr?: string | null;
  history?: { at: string; status: string; source: string }[];
};

type Entry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  age: number;
  pitchUrl: string;
  status: string;
  notes: string;
  payment: Payment;
  createdAt: string;
};

type Stats = {
  total: number;
  last24h: number;
  last7d: number;
  shortlisted: number;
  paidCount: number;
  revenue: number;
  pendingPayments: number;
  schools: number;
  daily: Record<string, number>;
};

const money = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const safeHref = (u: string) => (/^https?:\/\//i.test(u) ? u : "#");

const badgeTone: Record<string, string> = {
  shortlisted: "bg-emerald-500/15 text-emerald-300",
  finalist: "bg-emerald-500/15 text-emerald-300",
  paid: "bg-emerald-500/15 text-emerald-300",
  reviewing: "bg-accent/20 text-accent",
  pending: "bg-accent/20 text-accent",
  rejected: "bg-red-500/15 text-red-300",
  failed: "bg-red-500/15 text-red-300",
  refunded: "bg-orange-500/15 text-orange-300",
};
const Badge = ({ v }: { v: string }) => (
  <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeTone[v] ?? "bg-white/10 text-white/60"}`}>{v}</span>
);

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-electric-blue/50";
const selectCls = `${inputCls} [&>option]:bg-[#0a1542]`;

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "border-accent/25 bg-accent/10" : "border-white/8 bg-white/[0.03]"}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
      <p className={`mt-1.5 text-3xl font-bold tracking-tight ${accent ? "text-accent" : "text-white"}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
    </div>
  );
}

function DailyChart({ daily }: { daily: Record<string, number> }) {
  const days: { key: string; label: string; n: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    // Server groups by India date, so build keys the same way.
    const key = d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    days.push({ key, label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), n: daily[key] ?? 0 });
  }
  const max = Math.max(1, ...days.map((d) => d.n));
  return (
    <div>
      <div className="flex h-24 items-end gap-1">
        {days.map((d) => (
          <div
            key={d.key}
            title={`${d.label}: ${d.n}`}
            className="flex-1 rounded-t bg-accent/80 transition-colors hover:bg-accent"
            style={{ height: `${Math.max(3, (d.n / max) * 100)}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-white/35">
        <span>{days[0].label}</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export default function YoungCeoAdminPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Entry | null>(null);
  const [exporting, setExporting] = useState(false);

  const [tick, setTick] = useState(0); // bump to force a reload
  const reload = useCallback(() => setTick((t) => t + 1), []);

  // Debounce the search box; reset to page 1 whenever the search changes.
  useEffect(() => {
    const t = setTimeout(() => {
      setQDebounced(q);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ page: String(page) });
    if (qDebounced) params.set("q", qDebounced);
    if (status) params.set("status", status);
    if (payment) params.set("payment", payment);

    (async () => {
      try {
        const res = await fetch(`/api/admin/young-ceo?${params}`);
        if (!res.ok) throw new Error(res.status === 401 ? "Session expired. Sign in again." : "Failed to load entries");
        const json = await res.json();
        if (cancelled) return;
        setEntries(json.entries || []);
        setStats(json.stats || null);
        setTotal(json.total || 0);
        setPages(json.pages || 1);
        setError("");
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load entries");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, qDebounced, status, payment, tick]);

  async function exportCsv() {
    setExporting(true);
    const params = new URLSearchParams({ format: "csv" });
    if (qDebounced) params.set("q", qDebounced);
    if (status) params.set("status", status);
    if (payment) params.set("payment", payment);
    try {
      const res = await fetch(`/api/admin/young-ceo?${params}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `young-ceo-entries-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  function onSaved(updated: Entry) {
    setEntries((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
    setSelected(updated);
    reload(); // refresh totals
  }

  return (
    <AdminPageWrapper
      title="Young CEO Challenge"
      subtitle={`${stats?.total ?? total} registration${(stats?.total ?? total) !== 1 ? "s" : ""}`}
      actions={
        <>
          <button type="button" onClick={reload} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition hover:border-white/30 hover:text-white">
            Refresh
          </button>
          <button type="button" onClick={exportCsv} disabled={exporting || total === 0} className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white/70 transition hover:border-white/30 hover:text-white disabled:opacity-40">
            {exporting ? "Exporting…" : "Export CSV"}
          </button>
        </>
      }
    >
      {stats && (
        <>
          <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            <StatCard label="Registrations" value={stats.total} sub={`${stats.last24h} in last 24h`} />
            <StatCard label="Last 7 days" value={stats.last7d} />
            <StatCard label="Schools" value={stats.schools} />
            <StatCard label="Shortlisted / finalists" value={stats.shortlisted} />
            <StatCard label="Revenue" value={money(stats.revenue)} sub={`${stats.paidCount} paid`} accent />
            <StatCard label="Payments pending" value={stats.pendingPayments} accent />
          </div>
          <div className="mb-6 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Registrations, last 30 days</p>
            <DailyChart daily={stats.daily} />
          </div>
        </>
      )}

      <div className="mb-5 grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
        <input className={inputCls} type="search" placeholder="Search name, email, phone, school…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className={selectCls} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          {ENTRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className={selectCls} value={payment} onChange={(e) => { setPayment(e.target.value); setPage(1); }}>
          <option value="">All payments</option>
          {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {error && <p className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {loading && entries.length === 0 ? (
        <div className="space-y-3">{[1, 2, 3, 4].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />)}</div>
      ) : entries.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-lg font-bold text-white">No registrations found</h3>
          <p className="mt-2 text-sm text-white/40">{q || status || payment ? "Nothing matches these filters." : "Registrations from /ug/young-ceo-challenge will appear here."}</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.03]">
                  {["Submitted", "Student", "Contact", "School", "Age", "Status", "Payment"].map((c) => (
                    <th key={c} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e._id} onClick={() => setSelected(e)} className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.04]">
                    <td className="px-4 py-3.5 text-xs text-white/50">{fmt(e.createdAt)}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-white">{e.name}</td>
                    <td className="px-4 py-3.5 text-xs text-white/70">{e.email}<span className="block text-white/40">{e.phone}</span></td>
                    <td className="px-4 py-3.5 text-xs text-white/60">{e.school}</td>
                    <td className="px-4 py-3.5 text-xs text-white/60">{e.age}</td>
                    <td className="px-4 py-3.5"><Badge v={e.status} /></td>
                    <td className="px-4 py-3.5">
                      <Badge v={e.payment?.status || "unpaid"} />
                      {e.payment?.amount ? <span className="mt-1 block text-xs text-white/45">{money(e.payment.amount)}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-white/40">
            <span>{total} match{total !== 1 ? "es" : ""}</span>
            {pages > 1 && (
              <div className="flex items-center gap-2">
                <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-full border border-white/15 px-3 py-1.5 font-bold text-white/70 disabled:opacity-30">Prev</button>
                <span>Page {page} of {pages}</span>
                <button type="button" disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="rounded-full border border-white/15 px-3 py-1.5 font-bold text-white/70 disabled:opacity-30">Next</button>
              </div>
            )}
          </div>
        </>
      )}

      {selected && <Drawer entry={selected} onClose={() => setSelected(null)} onSaved={onSaved} />}
    </AdminPageWrapper>
  );
}

function Drawer({ entry, onClose, onSaved }: { entry: Entry; onClose: () => void; onSaved: (e: Entry) => void }) {
  const p = entry.payment || ({} as Payment);
  const [status, setStatus] = useState(entry.status);
  const [notes, setNotes] = useState(entry.notes || "");
  const [pStatus, setPStatus] = useState(p.status || "unpaid");
  const [amount, setAmount] = useState(String(p.amount || 0));
  const [provider, setProvider] = useState(p.provider || "");
  const [reference, setReference] = useState(p.reference || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/young-ceo/${entry._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status, notes,
          payment: { status: pStatus, amount: Number(amount || 0), provider: provider.trim(), reference: reference.trim() },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      setMsg({ ok: true, text: "Saved" });
      onSaved(json.entry);
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  const label = "mb-1 mt-4 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/45";

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      <aside className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#080f2e] p-6 shadow-2xl" aria-label="Entry details">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">{entry.name}</h2>
            <p className="mt-0.5 text-xs text-white/40">Submitted {fmt(entry.createdAt)} · ID {entry._id}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-white/60 hover:text-white">Close</button>
        </div>

        <dl className="mt-5 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-2.5 text-sm">
          <dt className="text-[11px] uppercase tracking-wider text-white/40">Email</dt>
          <dd><a className="break-all text-blue-glow hover:underline" href={`mailto:${entry.email}`}>{entry.email}</a></dd>
          <dt className="text-[11px] uppercase tracking-wider text-white/40">Phone</dt>
          <dd><a className="text-blue-glow hover:underline" href={`tel:+91${entry.phone}`}>+91 {entry.phone}</a></dd>
          <dt className="text-[11px] uppercase tracking-wider text-white/40">School</dt>
          <dd className="text-white/80">{entry.school}</dd>
          <dt className="text-[11px] uppercase tracking-wider text-white/40">Age</dt>
          <dd className="text-white/80">{entry.age}</dd>
          <dt className="text-[11px] uppercase tracking-wider text-white/40">Pitch</dt>
          <dd><a className="break-all text-blue-glow hover:underline" href={safeHref(entry.pitchUrl)} target="_blank" rel="noopener noreferrer">{entry.pitchUrl}</a></dd>
        </dl>

        <div className="mt-6 border-t border-white/10 pt-2">
          <p className={label}>Review status</p>
          <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}>
            {ENTRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <p className={label}>Internal notes</p>
          <textarea className={inputCls} rows={3} maxLength={2000} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="mt-6 border-t border-white/10 pt-2">
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Payment</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className={label}>Status</p>
              <select className={selectCls} value={pStatus} onChange={(e) => setPStatus(e.target.value)}>
                {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <p className={label}>Amount (₹)</p>
              <input className={inputCls} type="number" min={0} step={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <p className={label}>Provider</p>
              <input className={inputCls} type="text" maxLength={40} placeholder="jodo, upi, cash…" value={provider} onChange={(e) => setProvider(e.target.value)} />
            </div>
            <div>
              <p className={label}>Reference</p>
              <input className={inputCls} type="text" maxLength={100} placeholder="transaction id" value={reference} onChange={(e) => setReference(e.target.value)} />
            </div>
          </div>
          {p.paidAt && <p className="mt-3 text-xs text-white/45">Paid on {fmt(p.paidAt)}{p.settlementUtr ? ` · UTR ${p.settlementUtr}` : ""}</p>}
          {p.history && p.history.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-white/45">
              {[...p.history].reverse().map((h, i) => (
                <li key={i}>{fmt(h.at)}: {h.status} ({h.source})</li>
              ))}
            </ul>
          )}
        </div>

        <div className="sticky bottom-0 -mx-6 mt-6 flex items-center gap-3 border-t border-white/10 bg-[#080f2e] px-6 py-4">
          <button type="button" onClick={save} disabled={saving} className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-ink transition hover:bg-white disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
          {msg && <span className={`text-sm font-semibold ${msg.ok ? "text-emerald-300" : "text-red-300"}`}>{msg.text}</span>}
        </div>
      </aside>
    </>
  );
}
