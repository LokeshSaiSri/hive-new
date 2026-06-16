"use client";

import { useEffect } from "react";

export function ScrollToTopOnLoad() {
  useEffect(() => {
    if (window.location.hash) return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
