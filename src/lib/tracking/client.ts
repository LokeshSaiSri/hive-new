"use client";

import type { GoogleLeadEvent } from "@/lib/tracking/types";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const FBC_COOKIE = "_fbc";
const FBC_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

/** Persist Meta click ID from fbclid URL param for CAPI matching (no Pixel required). */
export function captureMetaClickId(): void {
  if (typeof window === "undefined") return;
  if (readCookie(FBC_COOKIE)) return;

  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return;

  writeCookie(FBC_COOKIE, `fb.1.${Date.now()}.${fbclid}`, FBC_MAX_AGE_SECONDS);
}

export function getMetaFbc(): string | undefined {
  return readCookie(FBC_COOKIE);
}

export function getMetaFbp(): string | undefined {
  return readCookie("_fbp");
}

export function createLeadEventId(): string {
  return crypto.randomUUID();
}

/** Push lead event to GTM dataLayer for GA4 / Google Ads tags (configured in GTM). */
export function pushGoogleLeadEvent(event: GoogleLeadEvent): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "generate_lead",
    event_id: event.eventId,
    programme: event.course,
    programme_interest: event.programme,
    city: event.city,
    // GTM Enhanced Conversions variable can read these if configured
    user_email: event.email,
    user_phone: event.phone,
  });
}
