import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";

export const metadata: Metadata = {
  title: "Application received — HiveSchool",
  description: "Your AI Marketing Fellowship application has been received.",
};

export default function AiMarketingFormSubmittedPage() {
  return (
    <FormSubmittedPage
      programme="AI Marketing Fellowship"
      applyHref="/ai-marketing/admissions"
    />
  );
}
