import Image from "next/image";

type OutcomeJourneyCardProps = {
  name: string;
  role: string;
  company: string;
  image?: string;
  previous?: string;
  index: number;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function OutcomeJourneyCard({
  name,
  role,
  company,
  image,
  previous,
}: OutcomeJourneyCardProps) {
  return (
    <article className="group premium-frame-dark w-[280px] shrink-0 hover-lift-card sm:w-[300px]">
      <div className="premium-surface-dark overflow-hidden rounded-[calc(1.5rem-1px)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-blue/20">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="300px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-blue to-ink">
              <span className="font-serif text-5xl font-bold text-white/20">
                {initials(name)}
              </span>
            </div>
          )}
          <div className="overlay-portrait absolute inset-0" />

          <div className="absolute inset-x-0 bottom-0 p-4 pt-16">
            <p className="font-serif text-xl font-semibold leading-tight text-white">
              {name}
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/80">
              {role}
            </p>
          </div>
        </div>

        <div className="card-metallic-dark-inset grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-5">
          <div className="min-w-0 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
              From
            </p>
            <p className="mt-1 text-sm font-medium leading-snug text-white/80">
              {previous ?? "—"}
            </p>
          </div>

          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10"
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-blue-glow"
            >
              <path d="M5 12h14M13 8l4 4-4 4" />
            </svg>
          </div>

          <div className="min-w-0 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
              Now
            </p>
            <p className="text-spark mt-1 text-sm font-bold leading-snug">
              {company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
