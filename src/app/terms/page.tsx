import type { Metadata } from "next";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { termsOfUse } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions — HiveSchool",
  description: "Terms and conditions for HiveSchool programmes, courses, and services.",
};

export default function TermsPage() {
  return (
    <SitePageLayout>
      <LegalDocument document={termsOfUse} />
    </SitePageLayout>
  );
}
