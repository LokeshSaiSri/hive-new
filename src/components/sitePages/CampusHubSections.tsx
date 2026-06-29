import Image from "next/image";
import Link from "next/link";
import { CampusVideoHero } from "@/components/ui/CampusVideoHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { PillButton } from "@/components/ui/PillButton";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { campusTabs, campusTourPoster, campusTourVideoId, campusVideoCaption } from "@/data/campus";
import { campusAmenities, campusLifeGallery } from "@/data/sitePages";

export function CampusSpacesBento({ className }: { className?: string }) {
  const [featured, ...rest] = campusTabs;

  return (
    <section className={`section-band-light section-py ${className ?? ""}`}>
      <div className="section-container">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Learning zones"
            statement="Six spaces,"
            emphasis="one campus."
            description="Every zone is built for a specific mode of revenue work — pitches, brainstorms, mocks, and recovery."
            align="left"
          />
        </ScrollReveal>

        <div className="campus-bento mt-10">
          <ScrollReveal className="campus-bento__featured">
            <article className="group relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-ink/8">
              <Image
                src={featured.image}
                alt={featured.label}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                  Featured zone
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{featured.label}</h3>
              </div>
            </article>
          </ScrollReveal>

          <div className="campus-bento__grid">
            {rest.map((space) => (
              <ScrollReveal key={space.id}>
                <article className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/8">
                  <Image
                    src={space.image}
                    alt={space.label}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                  <h3 className="absolute bottom-0 p-4 text-base font-semibold text-white sm:text-lg">
                    {space.label}
                  </h3>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CampusTourPanel() {
  return (
    <section id="campus-tour" className="hive-dark-band border-y border-white/10">
      <div className="section-container section-py">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <ScrollReveal>
            <SectionIntro
              light={false}
              eyebrow="Campus tour"
              statement="Walk through"
              emphasis="the spaces."
              description={campusVideoCaption}
              align="left"
            />
            <ul className="mt-8 space-y-3">
              {campusAmenities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton href="/pgp-revenue-tech-entrepreneurship/admissions" variant="highlight" tone="dark">
                Apply to PGP
              </PillButton>
              <PillButton href="/pgp-revenue-tech-entrepreneurship" variant="secondary" tone="dark">
                Explore programmes
              </PillButton>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <CampusVideoHero
                videoId={campusTourVideoId}
                posterSrc={campusTourPoster}
                caption={campusVideoCaption}
                inlinePreview
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function CampusLifeGallery() {
  return (
    <section className="section-band-light overflow-hidden">
      <div className="section-container section-py">
        <ScrollReveal>
          <SectionIntro
            eyebrow="Life at Hive"
            statement="What full-time"
            emphasis="actually looks like."
            description="Sprint rooms, founder panels, gym sessions, and the everyday rhythm of a revenue-focused campus."
            align="left"
          />
        </ScrollReveal>
      </div>

      <div className="mt-2 pb-14 sm:pb-16">
        <HorizontalScroller
          autoplay
          autoplayDelay={2000}
          slideClassName="w-[17.5rem] md:w-[26rem] flex-shrink-0"
        >
          {[...campusLifeGallery, ...campusLifeGallery].map((image, i) => (
            <div key={`${image.src}-${i}`} className="relative h-[18rem] md:h-[26rem] w-full overflow-hidden rounded-2xl border border-ink/8">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 416px"
              />
            </div>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}

export function CampusVisitPanel() {
  return (
    <section className="hive-dark-band">
      <div className="section-container section-py">
        <div className="grid gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:p-10">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-light-blue">Visit</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              The Circle, Sector 29
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              HiveSchool&apos;s Gurugram campus hosts full-time residential programmes, founder
              panels, and live brand challenges. Open houses and campus mixers are announced on our
              social channels.
            </p>
            <p className="mt-4 text-sm text-white/50">
              3rd Floor, Huda City Centre Metro Station, Sector 29,<br />
              Gurugram, Haryana — 122002
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex h-full flex-col justify-center gap-3">
              <Link
                href="/pgp-revenue-tech-entrepreneurship/admissions"
                className="rounded-xl border border-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                PGP admissions →
              </Link>
              <Link
                href="/ai-marketing/admissions"
                className="rounded-xl border border-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                Fellowship admissions →
              </Link>
              <Link
                href="https://www.instagram.com/hiveschool.co"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/10 px-5 py-4 text-sm font-semibold text-white/80 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                Campus events on Instagram →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
