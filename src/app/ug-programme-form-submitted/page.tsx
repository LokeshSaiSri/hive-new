import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Application received — HiveSchool",
  description: "Your UG programme application has been received.",
  path: "/ug-programme-form-submitted",
  noIndex: true,
});

export default function UgFormSubmittedPage() {
  return (
    <FormSubmittedPage programme="Undergraduate Programme" applyHref="/#programmes" />
  );
}
