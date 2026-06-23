import { ApplyForm } from "@/components/shared/ApplyForm";
import { getDefaultProgrammeLabel } from "@/data/programPages/navigation";
import type { ProgramSlug } from "@/data/programPages/types";

type ProgramAdmissionsProps = {
  slug: ProgramSlug;
  className?: string;
};

export function ProgramAdmissions({ slug, className }: ProgramAdmissionsProps) {
  return (
    <section id="apply" className={`program-section hive-dark-band ${className ?? ""}`}>
      <ApplyForm
        variant="program"
        defaultProgramme={getDefaultProgrammeLabel(slug)}
      />
    </section>
  );
}
