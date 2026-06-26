import Link from "next/link";
import { placementReportDownloadPath } from "@/data/placementReportAccess";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { PillButton } from "@/components/ui/PillButton";

type FormSubmittedPageProps = {
  programme: string;
  applyHref: string;
};

export function FormSubmittedPage({ programme, applyHref }: FormSubmittedPageProps) {
  return (
    <>
      <Nav />
      <main className="hive-dark-band min-h-[80svh]">
        <div className="section-container flex min-h-[80svh] flex-col items-center justify-center py-24 text-center">
          <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-accent/10 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-accent">
            Application received
          </p>
          <h1 className="mt-4 max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-tight text-white">
            You have taken the first step!
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/65">
            We&apos;ve received your application for the {programme}. Our team will review it and
            get back to you soon.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <PillButton variant="highlight" tone="dark" href={placementReportDownloadPath("year-2")}>
              Download Placement Report
            </PillButton>
            <PillButton variant="secondary" tone="dark" href={applyHref}>
              Back to programme
            </PillButton>
          </div>

          <p className="mt-8 text-sm text-white/45">
            Questions?{" "}
            <Link href="/pgp-revenue-tech-entrepreneurship/admissions" className="text-white/70 underline underline-offset-4">
              Talk to admissions
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
