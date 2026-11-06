import Image from "next/image";
import Link from "next/link";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { PillButton } from "@/components/ui/PillButton";
import { YoungCeoApplyForm } from "@/components/young-ceo/YoungCeoApplyForm";
import {
  dates, eligibility, faqs, prizeTiles, pitchBeats, ranks, rubric, schedule, steps,
} from "@/data/youngCeo";

const IMG = "/images/young-ceo";
const wrap = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12";
const h2 = "text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl";
const serif = "font-serif italic font-normal";

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-4 text-[11px] font-bold uppercase tracking-[0.28em] ${dark ? "text-white/55" : "text-ink/55"}`}>
      {children}
    </p>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-ink/55 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(255,207,0,0.18)]" />
      {children}
    </span>
  );
}

export function YoungCeoPage() {
  return (
    <SitePageLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={`${IMG}/hero.jpg`} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[62%_35%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-transparent to-ink/85" />
        <div className={`${wrap} pb-24 pt-44 sm:pb-32 sm:pt-52`}>
          <Link href="/ug" className="mb-8 inline-block text-sm font-medium text-white/65 transition-colors hover:text-white">
            ← Undergraduate Programme
          </Link>
          <div className="mb-8">
            <Pill>Young CEO Challenge India 2027 · by HiveSchool</Pill>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            India&apos;s <span className={`${serif} bg-gradient-to-r from-blue-glow to-white bg-clip-text text-transparent`}>biggest</span>{" "}
            business challenge for Class 12 students.
          </h1>
          <p className="mt-8 max-w-xl border-l-2 border-accent pl-5 text-lg font-light leading-relaxed text-white/80 sm:text-xl">
            ₹1 crore in scholarships. A pitch in front of Shark Tank founders and investors. Free to enter.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PillButton variant="highlight" tone="dark" href="#register">Register free</PillButton>
            <PillButton variant="secondary" tone="dark" href="#how">How it works →</PillButton>
          </div>
        </div>
      </section>

      {/* THE PITCH */}
      <section id="pitch" className="scroll-mt-32 bg-white py-20 text-ink sm:py-28">
        <div className={wrap}>
          <div className="max-w-3xl">
            <Eyebrow>What every student submits</Eyebrow>
            <h2 className={h2}>Your idea, in a <span className={`${serif} text-ink/60`}>90-second pitch.</span></h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">
              Pitch your business idea the way you would to an investor. On your phone, no slides, 60 to 90 seconds. Cover four things, in order.
            </p>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[1.75rem] bg-ink p-7 text-white sm:p-12">
            <p className="max-w-4xl text-2xl font-medium leading-snug tracking-tight sm:text-4xl">
              You are in a lift with an investor. You have <em className={`${serif} text-accent`}>ninety seconds.</em> Tell them the problem, your solution, who pays for it, and why it will work.
            </p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {pitchBeats.map((b) => (
                <div key={b.n} className="rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                  <span className="text-xs font-bold tracking-[0.14em] text-accent">{b.n}</span>
                  <h3 className="mt-2.5 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-white/75">{b.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-6">
              <p className="max-w-2xl text-base font-light leading-relaxed text-white/75">
                Record it in one take on a phone. No slides, no edits needed. Students who prefer not to record can submit the same four things in 200 words. Judges check the specifics: a named customer and a number beat a big claim.
              </p>
              <div className="flex flex-wrap gap-2">
                {["60 to 90 seconds", "or 200 words", "No slides"].map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Eyebrow>How pitches are judged</Eyebrow>
            <h2 className={`${h2} !text-3xl sm:!text-4xl`}>Five things. <span className={`${serif} text-ink/60`}>Nothing else.</span></h2>
            <p className="mt-4 max-w-2xl text-ink/65">
              Every pitch is scored on the five criteria below, and every entrant gets the feedback. The examples show what the judges mean by strong and weak.
            </p>
            <div className="mt-8 divide-y divide-ink/10 border-y-2 border-ink">
              {rubric.map((r) => (
                <div key={r.n} className="grid gap-4 py-7 lg:grid-cols-[4rem_1.1fr_1fr_1fr] lg:gap-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold">{r.n}</span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{r.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{r.look}</p>
                  </div>
                  <div className="rounded-2xl border border-accent/60 bg-accent/15 p-4 text-[14.5px] leading-relaxed">
                    <b className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a6200]">Strong</b>
                    {r.strong}
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-ink/[0.035] p-4 text-[14.5px] leading-relaxed text-ink/60">
                    <b className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">Weak</b>
                    {r.weak}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="scroll-mt-32 bg-ink py-20 text-white sm:py-28">
        <div className={wrap}>
          <div className="max-w-3xl">
            <Eyebrow dark>How it works</Eyebrow>
            <h2 className={h2}>From a phone pitch to <span className={`${serif} bg-gradient-to-r from-blue-glow to-white bg-clip-text text-transparent`}>Teen Tank.</span></h2>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/75">
              Five steps between 5 November and 17 January. Everything before the finale happens online.
            </p>
          </div>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                <span className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-bold ${s.hot ? "border-accent bg-accent text-ink" : "border-white/15 bg-ink text-accent"}`}>{s.n}</span>
                <span className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{s.when}</span>
                <h3 className="mb-2.5 text-xl font-bold leading-tight tracking-tight">{s.title}</h3>
                <p className="text-[15px] font-light leading-relaxed text-white/75">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PillButton variant="highlight" tone="dark" href="#register">Register free</PillButton>
            <PillButton variant="secondary" tone="dark" href="#dates">See all dates →</PillButton>
          </div>
        </div>
      </section>

      {/* WHAT STUDENTS WIN */}
      <section id="prizes" className="scroll-mt-32 bg-ink pb-20 text-white sm:pb-28">
        <div className={wrap}>
          <div className="max-w-3xl border-t border-white/10 pt-20">
            <Eyebrow dark>What students win</Eyebrow>
            <h2 className={h2}>Not just a scholarship. <span className={`${serif} bg-gradient-to-r from-blue-glow to-white bg-clip-text text-transparent`}>A head start.</span></h2>
            <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/75">
              ₹1 crore in scholarships to HiveSchool&apos;s UG in Business, AI and Entrepreneurship. A ₹1 lakh equity-free grant for the winner. A printed magazine for all 150 finalists. And a pitch in front of Shark Tank founders and investors.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <div className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl p-7 sm:p-9 lg:col-span-7 lg:row-span-2">
              <Image src={`${IMG}/pitch.jpg`} alt="A student pitching to a panel" fill sizes="(max-width:1024px) 100vw, 58vw" className="-z-20 object-cover object-[55%_30%]" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/25 via-ink/55 to-ink/95" />
              <div className="mb-auto"><Pill>Teen Tank · Sunday 3 January 2027</Pill></div>
              <h3 className="max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Pitch in front of Shark Tank founders and investors.</h3>
              <p className="mt-3 max-w-lg font-light leading-relaxed text-white/80">
                Every finalist pitches to a founder on campus. Twelve teams go on to Teen Tank, judged by the full panel and streamed live.
              </p>
              <span className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">All 150 finalists · Teen Tank for 12 teams</span>
            </div>
            {prizeTiles.map((t, i) => (
              <div
                key={t.big}
                className={`flex flex-col justify-end gap-3 rounded-3xl p-7 ${i === 0 ? "bg-accent text-ink lg:col-span-5" : "border border-white/10 bg-[#0b1744] lg:col-span-5"}`}
              >
                <span className="text-5xl font-bold leading-none tracking-[-0.04em] sm:text-6xl">
                  {t.big}
                  <small className={`mt-3 block text-sm font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-ink/60" : "text-white/60"}`}>{t.small}</small>
                </span>
                <p className={`text-[15px] leading-relaxed ${i === 0 ? "text-ink/80" : "font-light text-white/75"}`}>{t.body}</p>
                <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${i === 0 ? "text-ink/60" : "text-accent"}`}>{t.foot}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/55">*Access to the incubation fund is for students enrolled at HiveSchool.</p>
        </div>
      </section>

      {/* RANKS */}
      <section id="ranks" className="scroll-mt-32 bg-white py-20 text-ink sm:py-28">
        <div className={wrap}>
          <div className="max-w-3xl">
            <Eyebrow>Scholarships by rank</Eyebrow>
            <h2 className={h2}>What each rank <span className={`${serif} text-ink/60`}>takes home.</span></h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">
              Scholarships are to the UG in Business, AI and Entrepreneurship, starting August 2027.
            </p>
          </div>
          <div className="mt-12 flex flex-col gap-3">
            {ranks.map((r) => (
              <div
                key={r.rank}
                className={`grid gap-4 rounded-3xl border p-6 sm:p-8 lg:grid-cols-[13rem_15rem_1fr] lg:items-center lg:gap-8 ${
                  r.top ? "border-ink bg-ink text-white" : r.all ? "border-accent bg-accent" : "border-ink/10 bg-ink/[0.025]"
                }`}
              >
                <div>
                  <b className={`block text-[11px] font-bold uppercase tracking-[0.2em] ${r.top ? "text-accent" : "text-ink/60"}`}>{r.rank}</b>
                  <span className={`${serif} mt-1.5 block text-2xl leading-tight`}>{r.who}</span>
                </div>
                <div className={`text-4xl font-bold leading-none tracking-[-0.04em] ${r.top ? "text-accent" : ""}`}>
                  {r.amt}
                  <small className={`mt-2 block text-xs font-semibold uppercase tracking-[0.12em] ${r.top ? "text-white/60" : "text-ink/60"}`}>{r.sub}</small>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.chips.map((c, i) => (
                    <span
                      key={c}
                      className={`rounded-full border px-3.5 py-2 text-sm font-medium ${
                        r.top
                          ? i === 0 ? "border-accent bg-accent text-ink" : "border-white/15 bg-white/10 text-white"
                          : i === 0 && !r.all ? "border-accent/70 bg-accent/20" : "border-ink/10 bg-white/60"
                      }`}
                    >
                      + {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              {[["100", "Scholarships"], ["150", "Finalists on campus"], ["17 Jan", "Claim deadline"]].map(([n, l]) => (
                <div key={l}>
                  <b className="block text-2xl font-bold tracking-tight">{n}</b>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">{l}</span>
                </div>
              ))}
            </div>
            <PillButton variant="primary" tone="light" href="#register">Register free</PillButton>
          </div>
        </div>
      </section>

      {/* FINALE */}
      <section id="finale" className="relative isolate scroll-mt-32 overflow-hidden py-20 text-white sm:py-28">
        <Image src={`${IMG}/finale.jpg`} alt="" fill sizes="100vw" className="-z-20 object-cover object-[center_42%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/35" />
        <div className={`${wrap} grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]`}>
          <div>
            <div className="mb-7"><Pill>Finale day · Sunday 3 January 2027</Pill></div>
            <h2 className={`${h2} mb-6`}>One day on campus. <span className={`${serif} text-accent`}>Then Teen Tank.</span></h2>
            <p className="max-w-xl border-l-2 border-accent pl-5 text-lg font-light leading-relaxed text-white/85">
              The 150 finalists spend the day at the HiveSchool campus in Gurugram, building and pitching. By evening, twelve teams pitch live in front of Shark Tank founders and investors.
            </p>
            <p className="mt-6 max-w-xl text-sm text-white/65">Finalists are invited with a parent. The finale is in Gurugram; travel is the family&apos;s own.</p>
          </div>
          <ul className="rounded-3xl border border-white/15 bg-ink/60 px-6 py-2 backdrop-blur-xl sm:px-8">
            {schedule.map((s) => (
              <li key={s.t} className="grid gap-2 border-b border-white/10 py-5 last:border-0 sm:grid-cols-[7rem_1fr] sm:gap-5">
                <span className="pt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">{s.t}</span>
                <div>
                  <b className="block text-lg font-semibold leading-snug">{s.title}</b>
                  <p className="mt-1.5 text-[15px] font-light leading-relaxed text-white/75">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHO */}
      <section id="who" className="scroll-mt-32 bg-white py-20 text-ink sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16`}>
          <div>
            <Eyebrow>Who it is for</Eyebrow>
            <h2 className={h2}>Any stream. Any board. <span className={`${serif} text-ink/60`}>Anywhere in India.</span></h2>
            <ul className="mt-9 flex flex-col gap-3">
              {eligibility.map((e) => (
                <li key={e.n} className="grid grid-cols-[2.75rem_1fr] items-center gap-4 rounded-2xl border border-ink/10 p-4 sm:p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-xs font-bold text-accent">{e.n}</span>
                  <div>
                    <b className="block text-lg font-semibold tracking-tight">{e.title}</b>
                    <span className="mt-0.5 block text-[15px] text-ink/60">{e.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3.3] overflow-hidden rounded-3xl bg-ink">
            <Image src={`${IMG}/tribe.jpg`} alt="HiveSchool students on campus in Gurugram" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
            <div className="absolute bottom-5 left-5"><Pill>HiveSchool campus · Gurugram</Pill></div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="scroll-mt-32 bg-ink py-20 text-white sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16`}>
          <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl bg-ink-deep sm:aspect-[4/4.8]">
            <Image src={`${IMG}/mentor.jpg`} alt="A HiveSchool student working through a problem with a founder" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover object-[50%_22%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
            <div className="absolute bottom-5 left-5"><Pill>Pitch to founders, not case judges</Pill></div>
          </div>
          <div>
            <Eyebrow dark>Why HiveSchool is doing it</Eyebrow>
            <p className="max-w-2xl text-2xl font-normal leading-snug tracking-tight sm:text-3xl">
              HiveSchool&apos;s UG in Business, AI and Entrepreneurship starts in August 2027. We would rather find students by watching them <em className={`${serif} text-accent`}>think about a customer and a rupee</em> than by reading a mark sheet. The challenge is our admissions front door: every finalist arrives with a scholarship in hand, and the 100 list is a public record of the sharpest business minds leaving school this year.
            </p>
            <p className="mt-7 flex items-center gap-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">
              <span className="h-px w-8 bg-accent" />HiveSchool · Gurugram
            </p>
            <Link href="/ug" className="mt-10 grid items-center gap-5 rounded-3xl border border-white/15 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07] sm:grid-cols-[1fr_auto]">
              <div>
                <span className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">The programme behind the scholarships</span>
                <b className="block text-xl font-semibold leading-snug tracking-tight">UG in Business, AI &amp; Entrepreneurship</b>
                <p className="mt-2 text-[15px] font-light text-white/75">A 3-year undergraduate programme at the HiveSchool campus in Gurugram, built around live projects and founders in the room. Starts August 2027.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["3 years", "On campus · Gurugram", "Starts August 2027"].map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">{t}</span>
                  ))}
                </div>
              </div>
              <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold">Learn more →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DATES */}
      <section id="dates" className="scroll-mt-32 bg-white py-20 text-ink sm:py-28">
        <div className={wrap}>
          <Eyebrow>Dates</Eyebrow>
          <h2 className={h2}>Seven dates to <span className={`${serif} text-ink/60`}>keep.</span></h2>
          <div className="relative mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {dates.map((d) => (
              <div key={d.small} className="relative pt-9">
                <span className={`absolute left-0 top-0 h-5 w-5 rounded-full border-2 border-ink ${d.key ? "bg-accent shadow-[0_0_0_5px_rgba(255,207,0,0.25)]" : "bg-white"}`} />
                <span className="absolute left-7 right-0 top-[9px] hidden h-0.5 bg-ink/10 xl:block" />
                <b className="block text-xl font-bold leading-tight tracking-tight">
                  <small className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55">{d.small}</small>
                  {d.big}
                </b>
                <span className="mt-2.5 block max-w-[11rem] text-[15px] leading-snug text-ink/60">{d.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-32 bg-ink py-20 text-white sm:py-28">
        <div className={`${wrap} grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16`}>
          <div className="lg:sticky lg:top-40">
            <Eyebrow dark>Questions</Eyebrow>
            <h2 className={h2}>Before you <span className={`${serif} bg-gradient-to-r from-blue-glow to-white bg-clip-text text-transparent`}>enter.</span></h2>
            <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-white/75">Short answers to what students, parents and counsellors ask first.</p>
          </div>
          <div>
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-white/12">
                <summary className="grid cursor-pointer list-none grid-cols-[2.75rem_1fr_2rem] items-start gap-3 py-6 text-lg font-medium leading-snug tracking-tight sm:text-xl [&::-webkit-details-marker]:hidden">
                  <i className="pt-1.5 text-xs font-bold not-italic tracking-[0.12em] text-accent">{String(i + 1).padStart(2, "0")}</i>
                  <span>{f.q}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-lg font-light leading-none transition-transform group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-ink">+</span>
                </summary>
                <div className="max-w-2xl pb-7 pl-14 text-base font-light leading-relaxed text-white/75">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="scroll-mt-24 bg-ink pb-20 text-white sm:pb-28">
        <div className={wrap}>
          <div className="relative grid items-start gap-10 overflow-hidden rounded-[2rem] bg-accent p-6 text-ink sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div className="lg:pt-4">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ink/65">Registrations open 5 November 2026</p>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Register free. <span className={serif}>Pitch in ninety seconds.</span>
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80">
                One idea, one phone, no slides. ₹1 crore in scholarships, a pitch in front of Shark Tank founders and investors, and a profile in the Young CEO magazine for every one of the 150 finalists. Entries close on 20 December.
              </p>
              <div className="mt-9 grid grid-cols-3 gap-4">
                {[["Free", "No entry fee"], ["20 Dec", "Entries close"], ["3 Jan", "Finale, Gurugram"]].map(([b, s]) => (
                  <div key={s} className="border-t border-ink/20 pt-3.5">
                    <b className="block text-2xl font-bold tracking-tight">{b}</b>
                    <span className="mt-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/65">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <YoungCeoApplyForm />
              <p className="mt-4 text-center text-sm text-ink/70">
                <Link href="#pitch" className="font-semibold underline">Read the question first</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </SitePageLayout>
  );
}
