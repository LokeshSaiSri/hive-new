import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin — HiveSchool",
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`min-h-screen overflow-x-clip bg-[#060f32] font-sans antialiased ${outfit.variable}`}>
      {children}
    </div>
  );
}
