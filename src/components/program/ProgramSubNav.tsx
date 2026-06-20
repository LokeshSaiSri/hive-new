"use client";

import Link from "next/link";
import { PillButton } from "@/components/ui/PillButton";
import type { ProgramNavConfig, ProgramTab } from "@/data/programPages/types";

type ProgramSubNavProps = {
  nav: ProgramNavConfig;
  activeTab: ProgramTab;
};

export function ProgramSubNav({ nav, activeTab }: ProgramSubNavProps) {
  return (
    <div className="program-subnav">
      <div className="section-container">
        <div className="program-subnav__inner">
          <nav className="program-subnav__tabs" aria-label={`${nav.title} sections`}>
            {nav.tabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <Link
                  key={tab.id}
                  href={tab.path}
                  className={`program-subnav__tab ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <PillButton variant="highlight" tone="dark" href={nav.applyHref} className="shrink-0">
            Apply Now
          </PillButton>
        </div>
      </div>
    </div>
  );
}
