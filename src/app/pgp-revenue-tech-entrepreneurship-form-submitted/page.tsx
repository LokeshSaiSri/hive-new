import type { Metadata } from "next";
import { FormSubmittedPage } from "@/components/pages/FormSubmittedPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Application received — HiveSchool",
  description: "Your HiveSchool application has been received.",
  path: "/pgp-revenue-tech-entrepreneurship-form-submitted",
  noIndex: true,
});

export default function PgpFormSubmittedPage() {
  return (
    <FormSubmittedPage
      programme="PGP in Revenue, Tech and Entrepreneurship"
      applyHref="/#programmes"
    />
  );
}
