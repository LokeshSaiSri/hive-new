"use client";

import Link from "next/link";
import type { ProgramNavConfig, ProgramTab } from "@/data/programPages/types";

type ProgramSubNavProps = {
  nav: ProgramNavConfig;
  activeTab: ProgramTab;
};

export function ProgramSubNav({ nav, activeTab }: ProgramSubNavProps) {
  return (
    <div className="program-subnav">
      <div className="section-container">
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
      </div>
    </div>
  );
}
