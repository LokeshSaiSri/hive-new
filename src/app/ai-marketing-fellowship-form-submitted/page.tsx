import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Application received — HiveSchool",
  description: "Your AI Marketing Fellowship application has been received.",
  path: "/ai-marketing-fellowship-form-submitted",
  noIndex: true,
});

export default function AiMarketingFormSubmittedPage() {
  return (
    <FormSubmittedPage
      programme="AI Marketing Fellowship"
      applyHref="/#programmes"
    />
  );
}
