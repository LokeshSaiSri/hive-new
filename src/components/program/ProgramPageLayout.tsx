import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { ProgramSubNav } from "@/components/program/ProgramSubNav";
import { getProgramNav } from "@/data/programPages/navigation";
import type { ProgramSlug, ProgramTab } from "@/data/programPages/types";

type ProgramPageLayoutProps = {
  slug: ProgramSlug;
  activeTab: ProgramTab;
  lead?: React.ReactNode;
  children: React.ReactNode;
};

export function ProgramPageLayout({
  slug,
  activeTab,
  lead,
  children,
}: ProgramPageLayoutProps) {
  const nav = getProgramNav(slug);

  return (
    <>
      <Nav />
      <main className="program-page">
        {lead}
        <ProgramSubNav nav={nav} activeTab={activeTab} />
        {children}
      </main>
      <Footer />
    </>
  );
}
