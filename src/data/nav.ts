export type NavLink = {
  label: string;
  href: string;
};

export type NavDropdownItem = {
  label: string;
  href: string;
  /** Sub-options shown indented under this item */
  children?: NavLink[];
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
        label: "AI Marketing & Entrepreneurship Fellowship",
        href: "/ai-marketing",
      },
      {
        label: "Undergraduate Programme",
        href: "/ug",
        children: [{ label: "Young CEO Challenge", href: "/ug/young-ceo-challenge" }],
      },
    ],
  },
  { type: "link", label: "Placements", href: "/placements" },
  { type: "link", label: "Mentors", href: "/mentors" },
  { type: "link", label: "Events", href: "/events" },
  { type: "link", label: "Blogs", href: "/blogs" },
  { type: "link", label: "Campus", href: "/campus" },
];

export const programmeOptions = [
  "PGP in Revenue AI & Entrepreneurship",
  "AI Marketing Fellowship",
  "Undergraduate Programme",
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
