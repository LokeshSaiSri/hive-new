import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import { VideoProvider } from "@/components/providers/VideoProvider";
import { ScrollToTopOnLoad } from "@/components/providers/ScrollToTopOnLoad";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { HubSpotTracking } from "@/components/providers/HubSpotTracking";
import { GoogleTagManager } from "@/components/providers/GoogleTagManager";
import { MetaClickCapture } from "@/components/providers/MetaClickCapture";
import { PlacementReportModal } from "@/components/providers/PlacementReportModal";
import { AdminShortcut } from "@/components/providers/AdminShortcut";
import { JsonLd } from "@/components/seo/JsonLd";
import { asset } from "@/lib/assets";
import { buildRootMetadata } from "@/lib/seo/metadata";
import { buildGlobalSchemas } from "@/lib/seo/schema";
import { getSiteUrl } from "@/lib/seo/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...buildRootMetadata(),
  icons: {
    icon: [
      { url: asset("images/hiveschool_logo.jpeg"), type: "image/jpeg", sizes: "any" },
    ],
    apple: asset("images/hiveschool_logo.jpeg"),
    shortcut: asset("images/hiveschool_logo.jpeg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable}`}>
      <body className="min-h-screen overflow-x-clip">
        <JsonLd data={buildGlobalSchemas()} />
        <ScrollToTopOnLoad />
        <GoogleTagManager />
        <MetaClickCapture />
        <HubSpotTracking />
        <SmoothScroll>
          <VideoProvider>{children}</VideoProvider>
        </SmoothScroll>
        <PlacementReportModal />
        <AdminShortcut />
      </body>
    </html>
  );
}
