import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import { VideoProvider } from "@/components/providers/VideoProvider";
import { ScrollToTopOnLoad } from "@/components/providers/ScrollToTopOnLoad";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { asset } from "@/lib/assets";
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
  title: "HiveSchool — India's Only Revenue Focused Business School",
  description:
    "India's definitive education in revenue, marketing, and entrepreneurship — for people who intend to lead what drives every business.",
  icons: {
    icon: asset("images/misc/favicon-32.png"),
    apple: asset("images/misc/favicon-256.png"),
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
        <ScrollToTopOnLoad />
        <SmoothScroll>
          <VideoProvider>{children}</VideoProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
