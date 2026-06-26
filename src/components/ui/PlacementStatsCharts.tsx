"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useAutoAdvance } from "@/lib/useAutoAdvance";
import {
  ctcDistribution,
  industryMix,
  industryPieGradient,
  salaryByExperience,
  salaryJump,
  type PlacementBar,
} from "@/data/placementCharts";
import { easeHive } from "@/lib/motion";

type ChartKey = "ctc" | "experience" | "jump" | "industry";

type ChartConfig = {
  key: ChartKey;
  index: string;
  title: string;
  subtitle: string;
  kpiValue: string;
  kpiLabel: string;
  accent?: boolean;
  takeaways: string[];
  bars?: PlacementBar[];
  barSize?: "default" | "mini-three" | "mini-two";
  type: "bars" | "pie";
};

const CHARTS: ChartConfig[] = [
  {
    key: "ctc",
    index: "01",
    title: "CTC Distribution",
    subtitle: "How salaries spread from median to highest offer in the cohort.",
    kpiValue: "₹27.8L",
    kpiLabel: "Highest CTC",
    takeaways: [
      "Average CTC sits at ₹16.47L across the batch.",
      "Top 25% of offers cross ₹21.93L.",
      "Median placement is ₹15L — a strong floor for revenue roles.",
    ],
    bars: ctcDistribution,
    barSize: "default",
    type: "bars",
  },
  {
    key: "experience",
    index: "02",
    title: "Salary by Experience",
    subtitle: "Average offer levels across fresher and experienced candidates.",
    kpiValue: "₹19.2L",
    kpiLabel: "Avg for >2 yrs experience",
    takeaways: [
      "Freshers average ₹14.6L — competitive for first revenue roles.",
      "1–2 years experience lands around ₹15.33L.",
      "Candidates with 2+ years see a meaningful jump to ₹19.2L.",
    ],
    bars: salaryByExperience,
    barSize: "mini-three",
    type: "bars",
  },
  {
    key: "jump",
    index: "03",
    title: "Post-MBA Salary Jump",
    subtitle: "The uplift from pre-programme salary to post-MBA placement.",
    kpiValue: "+184%",
    kpiLabel: "Average salary increase",
    accent: true,
    takeaways: [
      "Pre-MBA average was ₹7.24L across the cohort.",
      "Post-MBA average rises to ₹16.47L.",
      "This is the clearest proof point for career acceleration.",
    ],
    bars: salaryJump,
    barSize: "mini-two",
    type: "bars",
  },
  {
    key: "industry",
    index: "04",
    title: "Industry Mix",
    subtitle: "Where placement offers concentrate by sector.",
    kpiValue: "50%",
    kpiLabel: "Tech & AI — largest segment",
    takeaways: [
      "Half of all offers come from Tech & AI companies.",
      "D2C and consumer tech make up another 41.7%.",
      "Placements skew toward high-growth, revenue-heavy sectors.",
    ],
    type: "pie",
  },
];

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

function useChartAnimation(chartKey: ChartKey, enabled: boolean) {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setReady(enabled);
      return;
    }

    setReady(false);
    if (!enabled) return;

    const timer = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(timer);
  }, [chartKey, enabled, prefersReducedMotion]);

  return ready || !!prefersReducedMotion;
}

const GRID_COLS = {
  default: "grid-cols-3 sm:grid-cols-6",
  "mini-three": "grid-cols-3",
  "mini-two": "grid-cols-2",
} as const;

// Compact (in-form) charts keep all bars on one row so the distribution reads
// as a single chart instead of wrapping into two rows on mobile.
const COMPACT_GRID_COLS = {
  default: "grid-cols-6",
  "mini-three": "grid-cols-3",
  "mini-two": "grid-cols-2",
} as const;

const CHART_LAYOUT = {
  default: {
    gridWrap: "",
    gridGap: "gap-x-1 sm:gap-x-1.5",
    barWidth: "w-[58%] max-w-[2.5rem] min-w-[1.2rem] sm:max-w-[2.75rem]",
    trackHeight: "min-h-[10rem] flex-1",
    valueClass: "text-lg font-bold tabular-nums leading-tight text-white sm:text-xl",
    labelClass: "text-sm font-semibold leading-snug text-white/75 sm:text-base",
    labelMaxW: "max-w-[7rem]",
  },
  "mini-three": {
    gridWrap: "mx-auto w-full max-w-2xl",
    gridGap: "gap-x-4 sm:gap-x-6",
    barWidth: "w-[84%] max-w-[6rem] min-w-[3rem] sm:max-w-[8rem]",
    trackHeight: "min-h-[12rem] flex-1",
    valueClass: "text-xl font-bold tabular-nums leading-tight text-white sm:text-2xl",
    labelClass: "text-base font-semibold leading-snug text-white/78 sm:text-lg",
    labelMaxW: "max-w-[9rem]",
  },
  "mini-two": {
    gridWrap: "mx-auto w-full max-w-xl",
    gridGap: "gap-x-5 sm:gap-x-8",
    barWidth: "w-[88%] max-w-[7.5rem] min-w-[3.5rem] sm:max-w-[10rem]",
    trackHeight: "min-h-[13rem] flex-1",
    valueClass: "text-2xl font-bold tabular-nums leading-tight text-white sm:text-3xl",
    labelClass: "text-lg font-semibold leading-snug text-white/78 sm:text-xl",
    labelMaxW: "max-w-[11rem]",
  },
} as const;

const COMPACT_CHART_LAYOUT = {
  default: {
    gridWrap: "",
    gridGap: "gap-x-0.5 sm:gap-x-1",
    barWidth: "w-[62%] max-w-[1.6rem] min-w-[0.7rem] sm:max-w-[1.85rem]",
    trackHeight: "min-h-[4rem] flex-1",
    valueClass: "text-[10px] font-bold tabular-nums leading-tight text-white sm:text-xs",
    labelClass: "text-[9px] font-medium leading-tight text-white/72 sm:text-[10px]",
    labelMaxW: "max-w-[2.75rem] sm:max-w-[3.25rem]",
  },
  "mini-three": {
    gridWrap: "mx-auto w-full max-w-xs",
    gridGap: "gap-x-2 sm:gap-x-3",
    barWidth: "w-[76%] max-w-[3rem] min-w-[1.75rem] sm:max-w-[3.5rem]",
    trackHeight: "min-h-[4rem] flex-1",
    valueClass: "text-xs font-bold tabular-nums leading-tight text-white sm:text-sm",
    labelClass: "text-[10px] font-semibold leading-snug text-white/75 sm:text-xs",
    labelMaxW: "max-w-[5rem]",
  },
  "mini-two": {
    gridWrap: "mx-auto w-full max-w-[14rem]",
    gridGap: "gap-x-3 sm:gap-x-4",
    barWidth: "w-[80%] max-w-[4rem] min-w-[2.25rem] sm:max-w-[4.5rem]",
    trackHeight: "min-h-[4rem] flex-1",
    valueClass: "text-sm font-bold tabular-nums leading-tight text-white sm:text-base",
    labelClass: "text-[10px] font-semibold leading-snug text-white/75 sm:text-xs",
    labelMaxW: "max-w-[6rem]",
  },
} as const;

const barEase = [0.2, 0.9, 0.2, 1] as const;

const COMPACT_LABEL_ABBREV: Record<string, string> = {
  Average: "Avg",
  Highest: "High",
  "1-2 Yrs Exp": "1–2 yr",
  ">2 Yrs Exp": "2+ yr",
};

function CompactBarLabel({ label }: { label: string }) {
  const topMatch = /^Top (\d+%)$/.exec(label);
  // Always render two lines so every column reserves identical label height —
  // otherwise taller (two-line) labels shrink their flex-1 track and lift bars.
  const [line1, line2] = topMatch
    ? ["Top", topMatch[1]]
    : [COMPACT_LABEL_ABBREV[label] ?? label, "\u00A0"];

  return (
    <span className="flex flex-col items-center gap-0.5 leading-none">
      <span>{line1}</span>
      <span>{line2}</span>
    </span>
  );
}

function VerticalBars({
  bars,
  active,
  size = "default",
  fill = false,
  compact = false,
}: {
  bars: PlacementBar[];
  active: boolean;
  size?: keyof typeof GRID_COLS;
  fill?: boolean;
  compact?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const layout = compact ? COMPACT_CHART_LAYOUT[size] : CHART_LAYOUT[size];
  const gridCols = compact ? COMPACT_GRID_COLS[size] : GRID_COLS[size];
  const trackHeight = compact
    ? layout.trackHeight
    : fill
      ? CHART_LAYOUT[size].trackHeight
      : size === "default"
        ? "h-[9.5rem] sm:h-[10.5rem]"
        : size === "mini-three"
          ? "h-[10rem] sm:h-[11rem]"
          : "h-[10.5rem] sm:h-[12rem]";
  const fillsPanel = fill || compact;

  return (
    <div
      className={`relative overflow-hidden ${
        compact
          ? "flex h-full min-h-0 flex-col"
          : "placement-chart-panel chart-panel-metallic rounded-xl px-3 py-4 sm:px-4 sm:py-5"
      } ${fillsPanel && !compact ? "flex min-h-0 flex-1 flex-col" : ""}`}
      role="img"
      aria-label={bars.map((b) => `${b.label} ${b.value}`).join(", ")}
    >
      <div
        className={`pointer-events-none absolute flex flex-col justify-between ${
          compact
            ? "inset-x-3 bottom-7 top-6 sm:inset-x-3.5 sm:bottom-8 sm:top-7"
            : "inset-x-3 bottom-8 top-8 sm:inset-x-4 sm:bottom-9 sm:top-9"
        }`}
        aria-hidden
      >
        {[0, 1, 2, 3].map((line) => (
          <div key={line} className="border-t border-white/[0.06]" />
        ))}
      </div>

      <div
        className={`relative grid ${gridCols} ${layout.gridGap} ${layout.gridWrap} ${
          fillsPanel ? "h-full min-h-0 flex-1 items-stretch" : ""
        }`}
      >
        {bars.map((bar, i) => (
          <div
            key={bar.label}
            className={`flex min-w-0 flex-col items-center ${fillsPanel ? "h-full" : ""}`}
          >
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.45, delay: 0.12 + i * 0.06, ease: easeHive }}
              className={`${compact ? "mb-1.5" : "mb-2.5"} text-center ${layout.valueClass}`}
            >
              {bar.value}
            </motion.span>

            <div className={`relative flex w-full items-end justify-center ${trackHeight}`}>
              <motion.div
                className={`${layout.barWidth} rounded-t-[8px] ${
                  bar.highlight ? "placement-bar-highlight" : "placement-bar-blue"
                }`}
                style={{ height: `${bar.visualHeight}%` }}
                initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0.35 }}
                animate={
                  active
                    ? { scaleY: 1, opacity: 1 }
                    : { scaleY: 0, opacity: 0.35 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.08 + i * 0.08,
                  ease: barEase,
                }}
              />
            </div>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.06, ease: easeHive }}
              className={`${compact ? "mt-1.5" : "mt-3"} px-0.5 text-center ${layout.labelMaxW} ${layout.labelClass}`}
            >
              {compact ? <CompactBarLabel label={bar.label} /> : bar.label}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IndustryPie({
  active,
  fill = false,
  compact = false,
}: {
  active: boolean;
  fill?: boolean;
  compact?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const legendItems = industryMix.map((item, i) => (
    <motion.div
      key={item.label}
      initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
      transition={{ duration: 0.45, delay: 0.18 + i * 0.08, ease: easeHive }}
      className={`flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-white/88 ${
        compact ? "px-2.5 py-2 text-[11px] sm:text-xs" : "px-4 py-3 text-lg sm:text-xl"
      }`}
    >
      <span className="flex min-w-0 items-center gap-2">
        <span
          className={`shrink-0 rounded-full ${compact ? "h-2 w-2" : "h-3 w-3"}`}
          style={{ backgroundColor: item.color }}
          aria-hidden
        />
        <span className="truncate font-semibold">{item.label}</span>
      </span>
      <strong
        className={`shrink-0 font-bold tabular-nums text-white ${
          compact ? "text-sm sm:text-base" : "text-2xl sm:text-3xl"
        }`}
      >
        {item.share}%
      </strong>
    </motion.div>
  ));

  if (compact) {
    return (
      <div className="flex items-center gap-3 sm:gap-4">
        <motion.div
          className="placement-pie h-[min(168px,42vw)] w-[min(168px,42vw)] shrink-0 sm:h-[180px] sm:w-[180px]"
          style={{ background: industryPieGradient }}
          role="img"
          aria-label="Industry distribution pie chart"
          initial={prefersReducedMotion ? false : { scale: 0.72, opacity: 0, rotate: -18 }}
          animate={
            active
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0.72, opacity: 0, rotate: -18 }
          }
          transition={{ duration: 0.85, ease: easeHive }}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">{legendItems}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center gap-4 ${fill ? "min-h-0 flex-1 justify-center" : ""}`}
    >
      <motion.div
        className="placement-pie h-[min(220px,48vw)] w-[min(220px,48vw)] shrink-0 sm:h-[min(240px,30vw)] sm:w-[min(240px,30vw)]"
        style={{ background: industryPieGradient }}
        role="img"
        aria-label="Industry distribution pie chart"
        initial={prefersReducedMotion ? false : { scale: 0.72, opacity: 0, rotate: -18 }}
        animate={
          active
            ? { scale: 1, opacity: 1, rotate: 0 }
            : { scale: 0.72, opacity: 0, rotate: -18 }
        }
        transition={{ duration: 0.85, ease: easeHive }}
      />
      <div className="flex w-full max-w-md flex-col gap-2">{legendItems}</div>
    </div>
  );
}

function ChartStepRail({
  charts,
  activeKey,
  onSelect,
}: {
  charts: ChartConfig[];
  activeKey: ChartKey;
  onSelect: (key: ChartKey) => void;
}) {
  const activeIndex = charts.findIndex((c) => c.key === activeKey);

  return (
    <nav className="mt-5" aria-label="Placement charts">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:grid-cols-4 sm:gap-2.5 sm:p-2.5">
        {charts.map((chart, i) => {
          const isActive = chart.key === activeKey;
          const isPast = i < activeIndex;

          return (
            <button
              key={chart.key}
              type="button"
              onClick={() => onSelect(chart.key)}
              aria-current={isActive ? "step" : undefined}
              className={[
                "rounded-lg px-3 py-3 text-left transition sm:px-4 sm:py-3.5",
                isActive
                  ? "bg-white/[0.08] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                  : "hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <span
                className={`block text-xs font-bold tabular-nums tracking-wider sm:text-sm ${
                  isActive ? "text-accent" : isPast ? "text-white/50" : "text-white/35"
                }`}
              >
                {chart.index}
              </span>
              <span
                className={`mt-1.5 block text-[11px] font-semibold leading-snug sm:text-sm ${
                  isActive ? "text-white" : "text-white/60"
                }`}
              >
                {chart.title}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ChartContextPanel({
  chart,
  compact = false,
}: {
  chart: ChartConfig;
  compact?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (compact) {
    return (
      <motion.div
        key={chart.key}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeHive }}
        className="flex flex-col"
      >
        <div className="border-l-2 border-accent pl-3">
          <h3 className="text-base font-bold leading-snug text-white sm:text-lg">{chart.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/55">{chart.subtitle}</p>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: easeHive }}
          className="mt-3 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2.5"
        >
          <p
            className={`text-xl font-bold leading-none tracking-tight sm:text-2xl ${
              chart.accent ? "text-accent" : "text-white"
            }`}
          >
            {chart.kpiValue}
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/42">
            {chart.kpiLabel}
          </p>
        </motion.div>

        <ul className="mt-3 space-y-1.5">
          {chart.takeaways.slice(0, 2).map((point, i) => (
            <motion.li
              key={point}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + i * 0.05, ease: easeHive }}
              className="flex gap-1.5 text-[11px] leading-relaxed text-white/52 sm:text-xs"
            >
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/80" aria-hidden />
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={chart.key}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeHive }}
      className="flex flex-col"
    >
      <div className="border-l-[3px] border-accent pl-4 sm:pl-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent/90">
          Chart {chart.index} of 04
        </p>
        <h3 className="mt-2 text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          {chart.title}
        </h3>
      </div>

      <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">
        {chart.subtitle}
      </p>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: easeHive }}
        className="mt-6 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-4 sm:px-5"
      >
        <p
          className={`text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-tight ${
            chart.accent ? "text-accent" : "text-white"
          }`}
        >
          {chart.kpiValue}
        </p>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
          {chart.kpiLabel}
        </p>
      </motion.div>

      <ul className="mt-6 space-y-2.5">
        {chart.takeaways.map((point, i) => (
          <motion.li
            key={point}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.14 + i * 0.07, ease: easeHive }}
            className="flex gap-2.5 text-sm leading-relaxed text-white/60"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" aria-hidden />
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function PlacementStatsCharts({ variant = "default" }: { variant?: "default" | "compact" }) {
  const compact = variant === "compact";
  const { ref, active: sectionActive } = useChartInView();
  const prefersReducedMotion = useReducedMotion();
  const [selected, setSelected] = useState<ChartKey>("ctc");
  const chart = CHARTS.find((c) => c.key === selected)!;
  const chartAnim = useChartAnimation(selected, sectionActive);

  const advanceChart = useCallback(() => {
    setSelected((current) => {
      const index = CHARTS.findIndex((entry) => entry.key === current);
      return CHARTS[(index + 1) % CHARTS.length].key;
    });
  }, []);

  useAutoAdvance(CHARTS.length, advanceChart, {
    enabled: sectionActive && !prefersReducedMotion,
    resetKey: selected,
    intervalMs: compact ? 5000 : undefined,
  });

  if (compact) {
    return (
      <div ref={ref} className="flex h-full flex-col">
        <div className="shrink-0 border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">
            Placement Report · Data Breakdown
          </p>
          <div className="mt-3">
            <ChartContextPanel chart={chart} compact />
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex min-h-[12rem] flex-1 flex-col rounded-xl chart-panel-metallic p-3 sm:p-3.5">
            <div className="mb-2 flex shrink-0 items-center justify-end">
              <span className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/55">
                {chart.index}/04
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: easeHive }}
                className="flex min-h-0 flex-1 flex-col"
              >
                {chart.type === "bars" && chart.bars && (
                  <VerticalBars
                    bars={chart.bars}
                    active={chartAnim}
                    size={chart.barSize ?? "default"}
                    compact
                  />
                )}

                {chart.type === "pie" && <IndustryPie active={chartAnim} compact />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-auto flex shrink-0 justify-center gap-1.5 border-t border-white/10 px-4 py-2.5 sm:px-5">
          {CHARTS.map((entry) => (
            <span
              key={entry.key}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                entry.key === selected ? "w-5 bg-accent" : "w-1.5 bg-white/20"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="border-t border-white/10">
      <div className="p-3 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-8 xl:gap-10">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
              Placement Report · Data Breakdown
            </p>

            <ChartStepRail charts={CHARTS} activeKey={selected} onSelect={setSelected} />

            <div className="mt-6">
              <ChartContextPanel chart={chart} />
            </div>
          </div>

          <div className="flex min-h-full flex-col">
            <div className="flex min-h-full flex-1 flex-col rounded-[14px] chart-panel-metallic p-4 sm:p-5">
              <div className="mb-4 flex shrink-0 items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Visual
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/90">{chart.title}</p>
                </div>
                <span className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                  {chart.index}/04
                </span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: easeHive }}
                    className="flex min-h-0 flex-1 flex-col justify-center"
                  >
                    {chart.type === "bars" && chart.bars && (
                      <VerticalBars
                        bars={chart.bars}
                        active={chartAnim}
                        size={chart.barSize ?? "default"}
                        fill
                      />
                    )}

                    {chart.type === "pie" && <IndustryPie active={chartAnim} fill />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
