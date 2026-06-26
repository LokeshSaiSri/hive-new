"use client";

import { useEffect, useRef } from "react";

export const AUTO_ADVANCE_MS = 4000;

export function useAutoAdvance(
  total: number,
  onAdvance: () => void,
  options?: {
    intervalMs?: number;
    resetKey?: string;
    enabled?: boolean;
  },
) {
  const intervalMs = options?.intervalMs ?? AUTO_ADVANCE_MS;
  const enabled = options?.enabled ?? true;
  const onAdvanceRef = useRef(onAdvance);

    // eslint-disable-next-line react-hooks/refs
  onAdvanceRef.current = onAdvance;

  useEffect(() => {
    if (total <= 1 || !enabled) return;

    const timer = window.setInterval(() => {
      onAdvanceRef.current();
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [total, intervalMs, options?.resetKey, enabled]);
}
