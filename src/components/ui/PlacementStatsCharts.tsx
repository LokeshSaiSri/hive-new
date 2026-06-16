"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  ctcDistribution,
  industryMix,
  industryPieGradient,
  salaryByExperience,
  salaryJump,
  type PlacementBar,
} from "@/data/placementCharts";

function useChartInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isInView || prefersReducedMotion) setActive(true);
  }, [isInView, prefersReducedMotion]);

  return { ref, active: active || !!prefersReducedMotion };
}

const GRID_COLS = {
  default: "grid-cols-3 sm:grid-cols-6",
  "mini-three": "grid-cols-3",
  "mini-two": "grid-cols-2 max-w-xs mx-auto w-full",
} as const;

function VerticalBars({
  bars,
  active,
  size = "default",
}: {
  bars: PlacementBar[];
  active: boolean;
  size?: keyof typeof GRID_COLS;
}) {
  const trackHeight =
    size === "default" ? "h-[13.5rem] sm:h-[14.1rem]" : "h-[11.5rem] sm:h-[13rem]";

  return (
    <div
      className={`placement-chart-panel chart-panel-metallic relative overflow-hidden rounded-xl px-2 py-4 sm:px-4 sm:py-5`}
      role="img"
      aria-label={bars.map((b) => `${b.label} ${b.value}`).join(", ")}
    >
      {/* horizontal grid lines */}
      <div
        className="pointer-events-none absolute inset-x-2 bottom-9 top-10 flex flex-col justify-between sm:inset-x-4 sm:bottom-10 sm:top-11"
        aria-hidden
      >
        {[0, 1, 2, 3].map((line) => (
          <div key={line} className="border-t border-white/[0.06]" />
        ))}
      </div>

      <div className={`relative grid ${GRID_COLS[size]} gap-x-1 sm:gap-x-2`}>
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex min-w-0 flex-col items-center">
            <span className="mb-2 text-center text-[10px] font-semibold tabular-nums leading-none text-white/90 sm:text-[11px]">
              {bar.value}
            </span>

            <div className={`relative flex w-full items-end justify-center ${trackHeight}`}>
              <div
                className={`placement-bar w-[58%] max-w-[2.75rem] min-w-[1.35rem] rounded-t-[8px] sm:max-w-[3.25rem] ${
                  bar.highlight
                    ? "placement-bar-highlight"
                    : "placement-bar-blue"
                } ${active ? "is-visible" : ""}`}
                style={{
                  height: `${bar.visualHeight}%`,
                  transitionDelay: `${80 + i * 70}ms`,
                }}
              />
            </div>

            <p className="mt-2.5 px-0.5 text-center text-[9px] leading-tight text-white/65 sm:text-[10px]">
              {bar.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GraphCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[14px] chart-panel-metallic p-5 sm:p-6 lg:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

function GraphKpi({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="mb-4 sm:mb-5">
      <p
        className={`text-[clamp(1.65rem,3.5vw,2.35rem)] font-bold leading-none tracking-tight ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
        {label}
      </p>
    </div>
  );
}

function IndustryPie({ active }: { active: boolean }) {
  return (
    <div className="mt-2 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-center">
      <div
        className={`placement-pie h-[min(200px,52vw)] w-[min(200px,52vw)] shrink-0 sm:h-[min(240px,34vw)] sm:w-[min(240px,34vw)] ${
          active ? "is-visible" : ""
        }`}
        style={{ background: industryPieGradient }}
        role="img"
        aria-label="Industry distribution pie chart"
      />
      <div className="flex w-full max-w-[12rem] flex-col gap-2">
        {industryMix.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-2 text-sm text-white/80"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              <span className="truncate">{item.label}</span>
            </span>
            <strong className="shrink-0 font-semibold text-white">
              {item.share}%
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlacementStatsCharts() {
  const { ref, active } = useChartInView();

  return (
    <div ref={ref} className="border-t border-white/10">
      <div className="space-y-4 p-4 sm:space-y-5 sm:p-6 lg:p-8">
        <GraphCard>
          <GraphKpi value="₹27.8L" label="Highest Salary" />
          <VerticalBars bars={ctcDistribution} active={active} size="default" />
        </GraphCard>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <GraphCard>
            <GraphKpi
              value="₹19.2L"
              label="Highest Avg · >2 Yrs Experience"
            />
            <VerticalBars
              bars={salaryByExperience}
              active={active}
              size="mini-three"
            />
          </GraphCard>

          <GraphCard>
            <GraphKpi
              value="+184%"
              label="Average Post-MBA Salary Jump"
              accent
            />
            <VerticalBars bars={salaryJump} active={active} size="mini-two" />
          </GraphCard>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 lg:items-center">
          <div className="px-1 sm:px-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              Placement Industry Mix
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Industry{" "}
              <em className="font-serif font-medium not-italic text-white/85">
                Distribution
              </em>
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
              Tech &amp; AI leads placements across SaaS, D2C, and consumer tech.
            </p>
            <div className="mt-5 grid gap-2">
              {industryMix.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white/72"
                >
                  <span>{item.label}</span>
                  <strong className="font-semibold text-white">
                    {item.share}%
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <GraphCard>
            <GraphKpi
              value="50%"
              label="Tech & AI · Largest Industry Segment"
            />
            <IndustryPie active={active} />
          </GraphCard>
        </div>
      </div>
    </div>
  );
}
