import { getCoursePageConfig } from "@/data/coursePages/registry";
import { getProgramNav } from "@/data/programPages/navigation";
import type { ProgramSlug, ProgramTab } from "@/data/programPages/types";

type ProgramTabHeaderProps = {
  slug: ProgramSlug;
  tab: ProgramTab;
};

export function ProgramTabHeader({ slug, tab }: ProgramTabHeaderProps) {
  const config = getCoursePageConfig(slug);
  const nav = getProgramNav(slug);
  const tabLabel = nav.tabs.find((item) => item.id === tab)?.label ?? tab;

  return (
    <section className="hive-dark-band border-b border-white/10">
      <div className="section-container pb-10 pt-28 sm:pb-12 sm:pt-32">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-glow">
          {config.programmeTitle}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white">
          {tabLabel}
        </h1>
      </div>
    </section>
  );
}
