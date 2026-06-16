"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroRotatingWord } from "@/components/ui/HeroRotatingWord";
import { HeroStatsBento } from "@/components/ui/HeroStatsBento";
import { PillButton } from "@/components/ui/PillButton";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import { easeHive, durationStandard } from "@/lib/motion";

function HeroChart() {
  return (
    <svg
      viewBox="0 0 400 120"
      className="pointer-events-none absolute bottom-[18%] right-[8%] hidden w-[min(34vw,420px)] opacity-30 lg:block"
      aria-hidden
    >
      <path
        d="M0 90 L60 72 L120 80 L180 48 L240 58 L300 22 L360 35 L400 8"
        fill="none"
        stroke="url(#heroChartGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0 90 L60 72 L120 80 L180 48 L240 58 L300 22 L360 35 L400 8 L400 120 L0 120 Z"
        fill="url(#heroChartFill)"
        opacity="0.35"
      />
      <defs>
        <linearGradient id="heroChartGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9bacff" />
          <stop offset="100%" stopColor="#ffcf00" />
        </linearGradient>
        <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffcf00" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#060f32" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative hive-dark-band">
      <div className="relative min-h-[100svh] overflow-hidden">
        <HeroBackgroundVideo />

        <div className="hero-slash pointer-events-none absolute inset-0 opacity-70" />
        <div className="hero-grid-lines pointer-events-none absolute inset-0" />
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.28] mix-blend-overlay" />
        <HeroChart />

        <div className="hero-panel-slab absolute inset-0 z-10" />

        <div className="relative z-20 flex min-h-[100svh] flex-col justify-center px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="section-container relative">
            <p
              className="hero-side-label pointer-events-none absolute -left-2 top-1/2 hidden -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.45em] text-white/20 lg:block"
              aria-hidden
            >
              HiveSchool · Gurugram
            </p>

            <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: durationStandard, ease: easeHive }}
                  className="mb-5"
                >
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-accent bg-accent px-4 py-2 shadow-[0_8px_28px_rgba(255,207,0,0.28)] sm:px-5 sm:py-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-ink sm:text-[11px] sm:tracking-[0.32em]">
                      Revenue-Focused Business School
                    </span>
                  </span>
                </motion.div>

                <h1 className="relative font-bold">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: easeHive }}
                    className="hero-text-mega block gradient-headline-dark"
                  >
                    Revenue
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.65, ease: easeHive }}
                    className="hero-text-sub mt-1 block pl-1 font-medium uppercase text-white/55"
                  >
                    runs the
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.65, ease: easeHive }}
                    className="mt-1 block overflow-visible pb-1 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]"
                  >
                    <HeroRotatingWord />
                  </motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: durationStandard, ease: easeHive }}
                  className="mt-6 max-w-md border-l-2 border-accent/60 pl-5 text-base leading-relaxed text-white/65 sm:text-lg"
                >
                  Learn GTM, sales, and entrepreneurship by doing — with operators
                  who&apos;ve scaled the companies you want to join.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: durationStandard, ease: easeHive }}
                  className="mt-8 flex flex-wrap gap-3 sm:gap-4"
                >
                  <PillButton variant="highlight" tone="dark" href="#programmes">
                    Explore Programmes
                  </PillButton>
                  <PillButton variant="secondary" tone="dark" href="#placement-report">
                    Placement Report
                  </PillButton>
                </motion.div>

                <div className="mt-10 max-w-lg lg:mt-12">
                  <HeroStatsBento />
                </div>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="h-7 w-px bg-white/15">
            <div className="animate-scroll-hint mx-auto h-2 w-px bg-accent" />
          </div>
        </div>
      </div>

      <div className="relative z-30 border-t border-white/10">
        <div className="section-container flex flex-col items-center justify-between gap-3 py-4 sm:flex-row sm:py-5">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white/40 sm:text-left">
            Inside HiveSchool — Campus Tour
          </p>
          <Link
            href="#campus"
            className="link-highlight group flex items-center gap-2 text-sm"
          >
            Explore our campus
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
