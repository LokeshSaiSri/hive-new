"use client";

import { useEffect } from "react";
import { getHubSpotPortalId, getHubSpotTrackingScriptUrl } from "@/data/hubspot";

function deferUntilIdle(callback: () => void) {
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(callback, { timeout: 3500 });
    return;
  }
  window.setTimeout(callback, 2500);
}

export function HubSpotTracking() {
  const portalId = getHubSpotPortalId();

  useEffect(() => {
    if (!portalId) return;

    deferUntilIdle(() => {
      if (document.getElementById("hs-script-loader")) return;

      const script = document.createElement("script");
      script.id = "hs-script-loader";
      script.src = getHubSpotTrackingScriptUrl(portalId);
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  }, [portalId]);

  return null;
}
