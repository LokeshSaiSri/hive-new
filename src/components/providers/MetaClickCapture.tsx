"use client";

import { useEffect } from "react";
import { captureMetaClickId } from "@/lib/tracking/client";

/** Captures fbclid from ad clicks for Meta CAPI attribution — no Pixel script. */
export function MetaClickCapture() {
  useEffect(() => {
    captureMetaClickId();
  }, []);

  return null;
}
