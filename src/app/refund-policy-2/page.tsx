import type { Metadata } from "next";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { termsOfUse } from "@/data/legal";

export const metadata: Metadata = {
  title: "Refund Policy — HiveSchool",
  description: "Refund policy for HiveSchool programmes and courses.",
};

/** Legacy hiveschool.co path — refund terms are covered under programme enrolment terms. */
export default function LegacyRefundPolicyPage() {
  return (
    <SitePageLayout>
      <LegalDocument document={termsOfUse} />
    </SitePageLayout>
  );
}
