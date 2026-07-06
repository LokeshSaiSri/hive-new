import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Application received — HiveSchool",
  description: "Your Fellowship: GTM, Revenue & AI application has been received.",
  path: "/launchpad-form-submitted",
  noIndex: true,
});

export default function LaunchpadFormSubmittedPage() {
  return (
    <FormSubmittedPage
      programme="Fellowship: GTM, Revenue & AI"
      applyHref="/fellowship-gtm-revenue-ai"
    />
  );
}
