"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Splits "₹16.47L" into "₹", 16.47 and "L". Returns null when there is no number to count. */
function parse(value: string) {
  const m = value.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const raw = m[2];
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  // Keep leading zeros ("09") so the width does not jump.
  const pad = !raw.includes(".") && raw.startsWith("0") ? raw.length : 0;
  return { prefix: m[1], number: Number(raw.replace(/,/g, "")), suffix: m[3], decimals, pad };
}

/**
 * Counts up to its number when it scrolls into view. Handles prefixes, suffixes and decimals
 * ("₹16.47L", "100+", "09"). Text with no number is shown as is.
 */
export function CountUp({ value, className = "", replayKey }: { value: string; className?: string; replayKey?: string | number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const parsed = parse(value);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.number, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce, replayKey]);

  if (!parsed || reduce) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const text = parsed.decimals > 0 ? shown.toFixed(parsed.decimals) : String(Math.round(shown)).padStart(parsed.pad, "0");
  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {text}
      {parsed.suffix}
    </span>
  );
}
