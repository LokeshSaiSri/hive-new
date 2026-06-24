import {
  getMetaCapiAccessToken,
  getMetaCapiTestEventCode,
  getMetaPixelId,
  isMetaCapiConfigured,
} from "@/data/tracking";
import { hashEmail, hashName, hashPhone } from "@/lib/tracking/hash";
import type { LeadTrackingPayload } from "@/lib/tracking/types";

const META_GRAPH_VERSION = "v21.0";

export async function sendMetaLeadEvent(payload: LeadTrackingPayload): Promise<void> {
  if (!isMetaCapiConfigured()) return;

  const pixelId = getMetaPixelId()!;
  const accessToken = getMetaCapiAccessToken()!;
  const url = new URL(`https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events`);
  url.searchParams.set("access_token", accessToken);

  const userData: Record<string, string | string[]> = {};

  const hashedEmail = payload.email ? hashEmail(payload.email) : undefined;
  const hashedPhone = payload.phone ? hashPhone(payload.phone) : undefined;
  const hashedFirst = payload.firstName ? hashName(payload.firstName) : undefined;
  const hashedLast = payload.lastName ? hashName(payload.lastName) : undefined;

  if (hashedEmail) userData.em = [hashedEmail];
  if (hashedPhone) userData.ph = [hashedPhone];
  if (hashedFirst) userData.fn = [hashedFirst];
  if (hashedLast) userData.ln = [hashedLast];
  if (payload.ipAddress) userData.client_ip_address = payload.ipAddress;
  if (payload.userAgent) userData.client_user_agent = payload.userAgent;
  if (payload.fbc) userData.fbc = payload.fbc;
  if (payload.fbp) userData.fbp = payload.fbp;

  const body: {
    data: {
      event_name: string;
      event_time: number;
      event_id: string;
      action_source: string;
      event_source_url?: string;
      user_data: Record<string, string | string[]>;
      custom_data?: Record<string, string>;
    }[];
    test_event_code?: string;
  } = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        action_source: "website",
        event_source_url: payload.pageUri,
        user_data: userData,
        custom_data: {
          content_name: payload.course,
          ...(payload.programme ? { programme: payload.programme } : {}),
          ...(payload.city ? { city: payload.city } : {}),
        },
      },
    ],
  };

  const testCode = getMetaCapiTestEventCode();
  if (testCode) body.test_event_code = testCode;

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Meta CAPI failed (${response.status}): ${detail}`);
  }
}
