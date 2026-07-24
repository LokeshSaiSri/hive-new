"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminPageWrapper({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#060f32] via-[#0a1848] to-[#04070d]">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:shrink-0">
        <AdminSidebar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#04070d]/70 px-6 py-4 backdrop-blur-xl">
          <div>
            <h1 className="text-lg font-bold text-white">{title}</h1>
            {subtitle && <p className="mt-0.5 text-xs text-white/45">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
