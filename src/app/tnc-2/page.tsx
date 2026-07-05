import type { Metadata } from "next";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { termsOfUse } from "@/data/legal";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions — HiveSchool",
  description: "Terms and conditions for HiveSchool programmes, courses, and services.",
  path: "/tnc-2",
});

export default function LegacyTermsPage() {
  return (
    <SitePageLayout>
      <LegalDocument document={termsOfUse} />
    </SitePageLayout>
  );
}
