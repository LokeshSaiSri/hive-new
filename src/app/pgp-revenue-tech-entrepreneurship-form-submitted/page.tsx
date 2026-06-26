import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";

export const metadata: Metadata = {
  title: "Application received — HiveSchool",
  description: "Your HiveSchool application has been received.",
};

export default function PgpFormSubmittedPage() {
  return (
    <FormSubmittedPage
      programme="PGP in Revenue, Tech and Entrepreneurship"
      applyHref="/pgp-revenue-tech-entrepreneurship/admissions"
    />
  );
}
