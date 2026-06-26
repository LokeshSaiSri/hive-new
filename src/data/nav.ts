export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdownItem = {
  label: string;
  href: string;
};

export type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "dropdown"; label: string; items: NavDropdownItem[] };

export const navItems: NavItem[] = [
  {
    type: "dropdown",
    label: "Programmes",
    items: [
      {
        label: "PGP in Revenue AI & Entrepreneurship",
        href: "/pgp-revenue-tech-entrepreneurship",
      },
      {
        label: "AI Marketing Fellowship",
        href: "/ai-marketing",
      },
      {
        label: "Undergraduate Programme",
        href: "/ug",
      },
    ],
  },
  { type: "link", label: "Placements", href: "/placements" },
  { type: "link", label: "Mentors", href: "/mentors" },
  { type: "link", label: "Campus", href: "/campus" },
];

export const programmeOptions = [
  "PGP in Revenue AI & Entrepreneurship",
  "AI Marketing Fellowship",
  "Undergraduate Programme",
  "Launchpad",
] as const;

export const cities = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Other",
] as const;
