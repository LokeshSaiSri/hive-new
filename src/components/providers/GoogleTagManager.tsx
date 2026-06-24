"use client";

import { useEffect } from "react";
import { getGtmId } from "@/data/tracking";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function deferUntilIdle(callback: () => void) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(callback, { timeout: 3000 });
    return;
  }
  window.setTimeout(callback, 2000);
}

export function GoogleTagManager() {
  const gtmId = getGtmId();

  useEffect(() => {
    if (!gtmId) return;

    deferUntilIdle(() => {
      if (document.getElementById("gtm-script")) return;

      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

      const script = document.createElement("script");
      script.id = "gtm-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
      document.head.appendChild(script);
    });
  }, [gtmId]);

  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
