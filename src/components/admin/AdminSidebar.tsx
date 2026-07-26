"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    href: "/hive-control-hub",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5">
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
    exact: true,
  },
  {
    href: "/hive-control-hub/events",
    label: "Events",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5">
        <rect x="2" y="3.5" width="16" height="14" rx="2" />
        <path d="M2 8.5h16M6.5 1.5v4M13.5 1.5v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/hive-control-hub/members",
    label: "Members",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5">
        <circle cx="8" cy="6" r="3" />
        <path d="M1 17c0-3.866 3.134-7 7-7s7 3.134 7 7" strokeLinecap="round" />
        <path d="M15 3a3 3 0 010 6M19 17c0-2.761-1.79-5.11-4.33-5.838" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/hive-control-hub/analytics",
    label: "Analytics",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5">
        <path d="M3 15l4-5 4 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 18h14" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    // Login page 404s without the secret key, so land on the homepage
    router.push("/");
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-white/8 bg-[#04070d]/60 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/8 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric-blue/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-blue-glow">
            <path d="M12 1l3 6 6.5 1-4.75 4.6 1.1 6.4L12 16l-5.85 3 1.1-6.4L2.5 8l6.5-1L12 1z" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">HiveSchool</p>
          <p className="text-sm font-bold text-white">Control Hub</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/25">Menu</p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-electric-blue/15 text-white shadow-[inset_0_0_0_1px_rgba(30,68,226,0.25)]"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-blue-glow" : ""}>{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-glow" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="my-4 border-t border-white/8" />

        <a
          href="/events"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-all duration-200 hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5">
            <path d="M10 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-6M14 3h3v3M10 10l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View Live Events
        </a>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/8 p-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5">
            <path d="M7.5 3H4a1 1 0 00-1 1v12a1 1 0 001 1h3.5M10 13l3-3-3-3M13 10H7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
