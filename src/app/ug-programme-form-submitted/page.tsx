import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";

export const metadata: Metadata = {
  title: "Application received — HiveSchool",
  description: "Your UG programme application has been received.",
};

export default function UgFormSubmittedPage() {
  return (
    <FormSubmittedPage programme="Undergraduate Programme" applyHref="/#programmes" />
  );
}
