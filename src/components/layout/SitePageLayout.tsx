import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";

type SitePageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function SitePageLayout({ children, className = "" }: SitePageLayoutProps) {
  return (
    <>
      <Nav />
      <main className={`site-page ${className}`.trim()}>{children}</main>
      <Footer />
    </>
  );
}
