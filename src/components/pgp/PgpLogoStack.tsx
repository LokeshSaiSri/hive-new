import { pgpLogoPath } from "@/data/coursePages/pgp-revamp";

/** Company logos as overlapping white chips. Renders nothing when there are none. */
export function PgpLogoStack({
  logos,
  size = "md",
  className = "",
}: {
  logos: string[];
  size?: "sm" | "md";
  className?: string;
}) {
  if (logos.length === 0) return null;
  const dim = size === "sm" ? "h-7 w-7 p-1" : "h-9 w-9 p-1.5";

  return (
    <ul className={`flex items-center ${className}`}>
      {logos.map((file, i) => (
        <li
          key={file}
          className={`-ml-2 first:ml-0 flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] ring-2 ring-[#0a1544] ${dim}`}
          style={{ zIndex: logos.length - i }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pgpLogoPath(file)} alt="" loading="lazy" className="h-full w-full object-contain" />
        </li>
      ))}
    </ul>
  );
}
