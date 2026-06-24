/**
 * Marketing analytics — Meta Conversions API (server-only, no Pixel script)
 * and Google tags via GTM + GA4 Measurement Protocol.
 *
 * META_PIXEL_ID is the Events Manager data source ID for CAPI — not a browser Pixel install.
 */

export function getGtmId(): string | undefined {
  return process.env.NEXT_PUBLIC_GTM_ID;
}

/** Meta CAPI data source ID (from Events Manager → Data sources). */
export function getMetaPixelId(): string | undefined {
  return process.env.META_PIXEL_ID;
}

export function getMetaCapiAccessToken(): string | undefined {
  return process.env.META_CAPI_ACCESS_TOKEN;
}

export function getMetaCapiTestEventCode(): string | undefined {
  return process.env.META_CAPI_TEST_EVENT_CODE;
}

export function isMetaCapiConfigured(): boolean {
  return Boolean(getMetaPixelId() && getMetaCapiAccessToken());
}

export function getGa4MeasurementId(): string | undefined {
  return process.env.GA4_MEASUREMENT_ID;
}

export function getGa4ApiSecret(): string | undefined {
  return process.env.GA4_API_SECRET;
}

export function isGa4MeasurementConfigured(): boolean {
  return Boolean(getGa4MeasurementId() && getGa4ApiSecret());
}
