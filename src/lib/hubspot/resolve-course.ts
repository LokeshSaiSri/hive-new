import { programmes } from "@/data/programmes";
import type { ProgramSlug } from "@/data/programPages/types";

const LAUNCHPAD_TITLE = "Launchpad";

export function resolveProgramSlugFromTitle(title: string): ProgramSlug | null {
  const programme = programmes.find((item) => item.title === title);
  if (programme) return programme.id as ProgramSlug;
  if (title === LAUNCHPAD_TITLE) return "ai-marketing";
  return null;
}
