import Link from "next/link";

export function FellowshipClosingCta() {
  return (
    <section className="fellowship-closing" aria-label="Apply">
      <div className="section-container fellowship-closing__inner">
        <h2 className="fellowship-closing__title">
          Build your <em>marketing portfolio.</em>
        </h2>
        <Link href="#apply" className="fellowship-btn fellowship-btn--gold">
          Start application
        </Link>
      </div>
    </section>
  );
}
