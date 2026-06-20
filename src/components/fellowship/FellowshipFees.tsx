import Link from "next/link";
import type { FellowshipOverview } from "@/data/fellowship/ai-marketing-overview";

type FellowshipFeesProps = {
  fees: FellowshipOverview["fees"];
};

export function FellowshipFees({ fees }: FellowshipFeesProps) {
  const total = fees.lines.find((l) => l.highlight)?.amount ?? "₹4,00,000";

  return (
    <section className="fellowship-fees-lux" aria-labelledby="fellowship-fees-heading">
      <div className="section-container fellowship-fees-lux__inner">
        <div>
          <p className="fellowship-eyebrow">{fees.eyebrow}</p>
          <h2 id="fellowship-fees-heading" className="fellowship-headline">
            {fees.statement} <em>{fees.emphasis}</em>
          </h2>
        </div>
        <div className="fellowship-fees-lux__card">
          <p className="fellowship-fees-lux__amount">{total}</p>
          <p className="fellowship-fees-lux__note">{fees.note}</p>
          <Link href="#apply" className="fellowship-btn fellowship-btn--ink">
            Apply · {fees.intake}
          </Link>
        </div>
      </div>
    </section>
  );
}
