"use client";

import { CourseApplicationForm } from "@/components/course/CourseApplicationForm";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";

type FellowshipApplyDockProps = {
  applicationForm: FellowshipOverview["applicationForm"];
  metrics: FellowshipOverview["hero"]["meta"];
};

export function FellowshipApplyDock({ applicationForm, metrics }: FellowshipApplyDockProps) {
  return (
    <section id="apply" className="fellowship-apply-dock" aria-label="Fellowship application">
      <div className="section-container fellowship-apply-dock__inner">
        <CourseApplicationForm
          courseSlug="ai-marketing"
          title={applicationForm.title}
          headline={applicationForm.headline}
          metrics={metrics}
          variant="fellowship"
        />
      </div>
    </section>
  );
}
