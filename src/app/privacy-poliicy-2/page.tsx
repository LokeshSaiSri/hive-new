import type { Metadata } from "next";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { privacyPolicy } from "@/data/legal";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — HiveSchool",
  description: "How HiveSchool collects, uses, and protects your personal information.",
  path: "/privacy-poliicy-2",
});

export default function LegacyPrivacyPage() {
  return (
    <SitePageLayout>
      <LegalDocument document={privacyPolicy} />
    </SitePageLayout>
  );
}
