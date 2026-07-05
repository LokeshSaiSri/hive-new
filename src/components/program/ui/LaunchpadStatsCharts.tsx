"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { easeHive } from "@/lib/motion";

type TrajectoryPoint = {
  year: number;
  lpa: number;
  label?: string;
};

type TrajectoryTab = {
  id: string;
  label: string;
  points: TrajectoryPoint[];
};

const TRAJECTORY_TABS: TrajectoryTab[] = [
  {
    id: "bdr-sdr",
    label: "BDR/SDR",
    points: [
      { year: 1, lpa: 14 },
      { year: 1.5, lpa: 16, label: "BDR" },
      { year: 3, lpa: 22, label: "AE" },
      { year: 5, lpa: 29, label: "Sales Lead" },
      { year: 6.5, lpa: 38, label: "Director Sales" },
      { year: 7.8, lpa: 48, label: "CRO" },
      { year: 8, lpa: 52 },
    ],
  },
  {
    id: "founding-bdr",
    label: "Founding BDR/ Associate AE",
    points: [
      { year: 1, lpa: 15 },
      { year: 1.8, lpa: 18, label: "Founding BDR/\nAssociate AE" },
      { year: 3.5, lpa: 26, label: "Founding AE" },
      { year: 5.5, lpa: 36, label: "GTM lead" },
      { year: 7.5, lpa: 48, label: "Director Revenue" },
      { year: 8, lpa: 54 },
    ],
  },
  {
    id: "ae",
    label: "AE",
    points: [
      { year: 1, lpa: 23 },
      { year: 4, lpa: 30, label: "AE" },
      { year: 5.5, lpa: 38, label: "Sales lead" },
      { year: 7, lpa: 48, label: "Director Sales" },
      { year: 8, lpa: 58, label: "CRO" },
    ],
  },
];

// Helper to convert data points into a smooth SVG curve
function smoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const tension = 0.2;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

export function LaunchpadStatsCharts() {
  const [activeTab, setActiveTab] = useState<string>(TRAJECTORY_TABS[0].id);
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = TRAJECTORY_TABS.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % TRAJECTORY_TABS.length;
        return TRAJECTORY_TABS[nextIndex].id;
      });
    }, 3500); // 3.5 seconds to give animation time to finish before switching
    return () => clearInterval(interval);
  }, [isInView]);

  const activeData = TRAJECTORY_TABS.find((t) => t.id === activeTab)!;

  // Viewbox dimensions
  const viewBoxWidth = 800;
  const viewBoxHeight = 400;

  // Coordinate mapping
  // X: 1 to 8 years -> 0 to 800
  // Y: 10 to 60 LPA -> 400 to 0
  const mapPoint = (p: TrajectoryPoint) => ({
    x: ((p.year - 1) / 7) * viewBoxWidth,
    y: viewBoxHeight - ((p.lpa - 10) / 50) * viewBoxHeight,
    label: p.label,
  });

  const points = activeData.points.map(mapPoint);
  const pathD = smoothPath(points);

  // Area path is line path + bottom right, bottom left corners
  const areaD = pathD ? `${pathD} L ${points[points.length - 1].x} ${viewBoxHeight} L ${points[0].x} ${viewBoxHeight} Z` : "";

  return (
    <div className="border-t border-white/10 p-4 sm:p-8 lg:p-12 mb-10">
      <div className="mx-auto max-w-5xl rounded-[20px] chart-panel-metallic p-6 sm:p-10 flex flex-col items-center pb-20 sm:pb-24">

        {/* Pill Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 z-10">
          {TRAJECTORY_TABS.map((tab) => (
            <button
              suppressHydrationWarning
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/[0.05] border border-white/10 text-white hover:bg-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart Area */}
        <div ref={chartRef} className="relative w-full max-w-4xl aspect-[2/1] sm:aspect-[2.2/1]">
          {/* Y Axis Labels */}
          <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between text-[10px] sm:text-xs font-bold text-white/50 -translate-x-full pr-4 pb-8 z-10">
            <span>50LPA</span>
            <span>40LPA</span>
            <span>30LPA</span>
            <span>25LPA</span>
            <span>15LPA</span>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pb-8 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full border-t border-white/[0.05] border-dashed" />
            ))}
          </div>

          {/* X Axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs sm:text-sm font-bold text-white/50 px-2 sm:px-4 z-10 translate-y-full pt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((yr) => (
              <span key={yr}>{yr}</span>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 text-center text-xs sm:text-sm font-bold text-white/40 translate-y-[4rem] sm:translate-y-[4.5rem]">
            Years of Experience
          </div>

          {/* SVG Canvas */}
          <div className="absolute inset-0 pb-8">
            <AnimatePresence mode="wait">
              {isInView && (
                <motion.svg
                  key={activeTab}
                  viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                  preserveAspectRatio="none"
                  className="w-full h-full overflow-visible"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <defs>
                    <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3f5be0" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3f5be0" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d={areaD}
                    fill="url(#area-gradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  />

                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Data point dots */}
                  {points.map((p, i) => (
                    <motion.circle
                      key={`${activeTab}-dot-${i}`}
                      cx={p.x}
                      cy={p.y}
                      r="5"
                      fill="#3f5be0"
                      stroke="#ffffff"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: 0.3 + i * 0.08,
                      }}
                    />
                  ))}

                </motion.svg>
              )}
            </AnimatePresence>
          </div>

          {/* HTML Data point labels for perfect mobile scaling */}
          <div className="absolute inset-0 pb-8 pointer-events-none overflow-visible">
            <AnimatePresence>
              {isInView && points.filter(p => p.label).map((p, i) => (
                <motion.div
                  key={`${activeTab}-html-label-${i}`}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                    delay: 0.4 + i * 0.08,
                  }}
                  className="absolute flex flex-col items-center justify-end"
                  style={{
                    left: `${(p.x / viewBoxWidth) * 100}%`,
                    top: `${(p.y / viewBoxHeight) * 100}%`,
                    transform: 'translate(-50%, -100%)',
                    paddingBottom: '16px'
                  }}
                >
                  <span className="text-white text-[9px] sm:text-xs font-bold text-center leading-[1.2] whitespace-pre-line bg-[#0B1021]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-xl shadow-black/50">
                    {p.label}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
