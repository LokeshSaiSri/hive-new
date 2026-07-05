import { programmes } from "@/data/programmes";
import type { ProgramSlug } from "@/data/programPages/types";

export function resolveProgramSlugFromTitle(title: string): ProgramSlug | null {
  const programme = programmes.find((item) => item.title === title);
  if (programme) return programme.id as ProgramSlug;
  return null;
}
