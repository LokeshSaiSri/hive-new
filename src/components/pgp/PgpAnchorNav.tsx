"use client";

import { useEffect, useState } from "react";
import { pgpAnchorNav } from "@/data/coursePages/pgp-revamp";

/** Sticky in-page menu. Highlights the section currently in view. */
export function PgpAnchorNav() {
  const [active, setActive] = useState<string>(pgpAnchorNav[0].id);

  useEffect(() => {
    const targets = pgpAnchorNav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="program-subnav">
      <div className="section-container">
        <nav className="program-subnav__tabs" aria-label="PGP page sections">
          {pgpAnchorNav.map((item) => {
            const isActive = item.id === active;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`program-subnav__tab ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
