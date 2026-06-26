import { asset } from "@/lib/assets";

export type HandbookPage = {
  src: string;
  alt: string;
};

export const startupHandbookPages: HandbookPage[] = Array.from({ length: 31 }, (_, i) => ({
  src: asset(`images/startup-handbook/page_${String(i + 1).padStart(2, "0")}.jpg`),
  alt: `Startup Handbook Page ${i + 1}`,
}));
