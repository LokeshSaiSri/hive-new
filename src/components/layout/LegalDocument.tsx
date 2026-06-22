import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { LegalDocument as LegalDocumentType } from "@/data/legal";

type LegalDocumentProps = {
  document: LegalDocumentType;
};

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <section className="section-band-light">
      <div className="section-container section-py">
        <ScrollReveal>
          <header className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-light-blue">
              Legal
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {document.title}
            </h1>
            {document.lastUpdated && (
              <p className="mt-4 text-sm text-mid-gray">Last updated: {document.lastUpdated}</p>
            )}
            {document.intro && (
              <p className="mt-6 text-base leading-relaxed text-mid-gray sm:text-lg">
                {document.intro}
              </p>
            )}
          </header>
        </ScrollReveal>

        <div className="mt-12 max-w-3xl space-y-10">
          {document.sections.map((section, index) => (
            <ScrollReveal key={section.title}>
              <article className="legal-section">
                <h2 className="text-lg font-semibold text-ink sm:text-xl">
                  {String(index + 1).padStart(2, "0")}. {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-mid-gray">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
