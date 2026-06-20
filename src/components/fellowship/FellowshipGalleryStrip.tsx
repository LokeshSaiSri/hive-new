"use client";

import Image from "next/image";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";

type FellowshipGalleryStripProps = {
  images: FellowshipOverview["galleryStrip"];
};

export function FellowshipGalleryStrip({ images }: FellowshipGalleryStripProps) {
  const loop = [...images, ...images];

  return (
    <section className="fellowship-gallery-strip" aria-hidden>
      <div className="fellowship-gallery-strip__track">
        {loop.map((src, i) => (
          <div key={`${src}-${i}`} className="fellowship-gallery-strip__frame">
            <Image src={src} alt="" fill className="object-cover" sizes="280px" />
          </div>
        ))}
      </div>
    </section>
  );
}
