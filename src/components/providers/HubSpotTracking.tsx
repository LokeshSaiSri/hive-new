"use client";

import { useEffect } from "react";
import { getHubSpotPortalId, getHubSpotTrackingScriptUrl } from "@/data/hubspot";

export function HubSpotTracking() {
  const portalId = getHubSpotPortalId();

  useEffect(() => {
    if (!portalId || document.getElementById("hs-script-loader")) return;

    const script = document.createElement("script");
    script.id = "hs-script-loader";
    script.src = getHubSpotTrackingScriptUrl(portalId);
    script.async = true;
    document.body.appendChild(script);
  }, [portalId]);

  return null;
}
