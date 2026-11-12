import type { SVGProps } from "react";

/** Small line-icon set for the PGP page. 24x24, stroke follows currentColor. */
const paths = {
  shield: "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z M9 12l2 2 4-4",
  cloud: "M7 18a4 4 0 010-8 5 5 0 019.6-1A4.5 4.5 0 0117 18z",
  code: "M8 8l-4 4 4 4 M16 8l4 4-4 4 M14 5l-4 14",
  cart: "M3 4h2l2 11h11l2-8H6 M9 20a1 1 0 100-.01 M17 20a1 1 0 100-.01",
  store: "M4 9l1-5h14l1 5 M4 9v11h16V9 M4 9a2.7 2.7 0 005.3 0 2.7 2.7 0 005.4 0A2.7 2.7 0 0020 9 M10 20v-5h4v5",
  box: "M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8",
  utensils: "M7 3v8 M5 3v5a2 2 0 004 0V3 M7 11v10 M16 3c-2 2-2 6 0 8v10 M16 3v8",
  bolt: "M13 2L5 14h6l-1 8 8-12h-6z",
  bag: "M5 8h14l-1 12H6z M9 8a3 3 0 016 0",
  ticket: "M4 8a2 2 0 002-2h12a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H6a2 2 0 00-2-2v-2a2 2 0 000-4z M14 6v12",
  heart: "M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z",
  phone: "M7 3h10v18H7z M11 18h2",
  car: "M5 16l1.5-5h11L19 16 M4 16h16v3H4z M7 19v2 M17 19v2 M8 13h.01 M16 13h.01",
  repeat: "M17 2l4 4-4 4 M3 11V9a3 3 0 013-3h15 M7 22l-4-4 4-4 M21 13v2a3 3 0 01-3 3H3",
  swap: "M7 4L3 8l4 4 M3 8h14 M17 20l4-4-4-4 M21 16H7",
  tag: "M3 12V4h8l10 10-8 8z M7.5 7.5h.01",
  megaphone: "M3 10v4l11 5V5z M14 8a4 4 0 010 8 M6 14l1 6h3l-1-5",
  coins: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  users: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z M2 20a7 7 0 0114 0 M16 4a3.5 3.5 0 010 7 M18 14a7 7 0 013 6",
  magnet: "M6 3v8a6 6 0 0012 0V3 M6 7h4 M14 7h4",
  flag: "M5 21V4 M5 4h12l-2 4 2 4H5",
  handshake: "M3 12l4-4 4 2 4-2 6 6-5 5-3-2-2 2-3-3-2 2z",
  cpu: "M7 7h10v10H7z M10 10h4v4h-4z M9 3v4 M15 3v4 M9 17v4 M15 17v4 M3 9h4 M3 15h4 M17 9h4 M17 15h4",
  chart: "M4 20h16 M7 16V9 M12 16V5 M17 16v-4",
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  briefcase: "M4 8h16v11H4z M9 8V5h6v3 M4 13h16",
  trending: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z M12 12h.01",
  rocket: "M5 15c-1 1-2 4-2 6 2 0 5-1 6-2 M14 4c4 0 6 2 6 6-2 4-5 7-9 9l-6-6c2-4 5-7 9-9z M14.5 9.5h.01",
  gavel: "M14 4l6 6 M5 13l6 6 M9 9l6 6 M3 21h8 M12 6l-4 4 M18 12l-4 4",
  trophy: "M8 4h8v5a4 4 0 01-8 0z M8 6H4a3 3 0 003 4 M16 6h4a3 3 0 01-3 4 M12 13v4 M8 21h8 M10 17h4",
  gift: "M4 10h16v10H4z M3 7h18v3H3z M12 7v13 M12 7C9 7 8 3 10.5 3 12.5 3 12 7 12 7z M12 7c3 0 4-4 1.5-4C11.5 3 12 7 12 7z",
  play: "M8 5l11 7-11 7z",
  check: "M5 12l4 4 10-10",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  book: "M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 21.5z M9 8h7",
  wrench: "M14 6a4 4 0 005 5l-9 9a2.1 2.1 0 01-3-3l9-9a4 4 0 00-2-2z",
  pin: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z M12 12a2 2 0 100-4 2 2 0 000 4z",
  calendar: "M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
} as const;

export type PgpIconName = keyof typeof paths;

export function PgpIcon({
  name,
  className = "h-5 w-5",
  ...rest
}: { name: PgpIconName; className?: string } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {paths[name].split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : `M${d}`} />
      ))}
    </svg>
  );
}
