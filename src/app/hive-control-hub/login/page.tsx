"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid password");
        setLoading(false);
        return;
      }

      router.push("/hive-control-hub");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#060f32] via-[#0a1848] to-[#04070d] px-4">
      {/* Background grain */}
      <div className="hero-grain pointer-events-none fixed inset-0 opacity-[0.12] mix-blend-overlay" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Card */}
        <div className="premium-frame">
          <div className="premium-surface-dark rounded-[calc(1.5rem-1px)] p-8">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-blue/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-blue-glow">
                  <path d="M12 1l3 6 6.5 1-4.75 4.6 1.1 6.4L12 16l-5.85 3 1.1-6.4L2.5 8l6.5-1L12 1z" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">HiveSchool</p>
                <p className="text-sm font-semibold text-white">Control Hub</p>
              </div>
            </div>

            <h1 className="mb-2 text-2xl font-bold text-white">Admin Login</h1>
            <p className="mb-8 text-sm text-white/50">Enter your password to continue.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label htmlFor="admin-password" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                  Password
                </label>
                <div className={`flex overflow-hidden rounded-xl border transition-all duration-200 ${
                  error ? "border-red-400/50" : "border-white/12 focus-within:border-electric-blue/60 focus-within:shadow-[0_0_0_3px_rgba(30,68,226,0.15)]"
                }`}>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="••••••••••"
                    className="w-full bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none"
                    required
                  />
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !password}
                className="w-full rounded-full bg-electric-blue py-3.5 text-sm font-bold text-white shadow-[0_8px_28px_rgba(30,68,226,0.3)] transition-all duration-300 hover:bg-light-blue hover:shadow-[0_12px_40px_rgba(30,68,226,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : "Sign In →"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
