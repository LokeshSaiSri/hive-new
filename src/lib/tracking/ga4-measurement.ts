import {
  getGa4ApiSecret,
  getGa4MeasurementId,
  isGa4MeasurementConfigured,
} from "@/data/tracking";
import { hashEmail, hashPhone } from "@/lib/tracking/hash";
import type { LeadTrackingPayload } from "@/lib/tracking/types";

export async function sendGa4LeadEvent(payload: LeadTrackingPayload): Promise<void> {
  if (!isGa4MeasurementConfigured()) return;

  const measurementId = getGa4MeasurementId()!;
  const apiSecret = getGa4ApiSecret()!;
  const url = new URL("https://www.google-analytics.com/mp/collect");
  url.searchParams.set("measurement_id", measurementId);
  url.searchParams.set("api_secret", apiSecret);

  const userData: Record<string, string[]> = {};
  const hashedEmail = payload.email ? hashEmail(payload.email) : undefined;
  const hashedPhone = payload.phone ? hashPhone(payload.phone) : undefined;
  if (hashedEmail) userData.sha256_email_address = [hashedEmail];
  if (hashedPhone) userData.sha256_phone_number = [hashedPhone];

  const body = {
    client_id: payload.eventId.replace(/-/g, "").slice(0, 32),
    events: [
      {
        name: "generate_lead",
        params: {
          event_id: payload.eventId,
          programme: payload.course,
          page_location: payload.pageUri,
          page_title: payload.pageName,
          ...(payload.programme ? { programme_interest: payload.programme } : {}),
          ...(payload.city ? { city: payload.city } : {}),
        },
      },
    ],
    ...(Object.keys(userData).length > 0 ? { user_data: userData } : {}),
  };

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GA4 Measurement Protocol failed (${response.status}): ${detail}`);
  }
}
