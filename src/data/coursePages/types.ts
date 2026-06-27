export type CourseStat = {
  value: string;
  label: string;
};

export type CourseMetaItem = {
  label: string;
  value: string;
};

export type CourseCta = {
  label: string;
  href: string;
};

export type CourseInlineCta = {
  id: string;
  variant: "dark" | "light" | "accent";
  eyebrow?: string;
  title: string;
  description: string;
  primary: CourseCta;
  secondary?: CourseCta;
};

export type CoursePillar = {
  index: string;
  title: string;
  description: string;
  image?: string;
  tagline?: string;
};

export type CourseTimelinePhase = {
  phase: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
};

export type CourseFeeLine = {
  label: string;
  amount: string;
  highlight?: boolean;
};

export type CourseScholarship = {
  title: string;
  description: string;
};

export type CoursePath = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  outcome: string;
  image?: string;
  tagline?: string;
};

export type CourseCapstone = {
  index: string;
  title: string;
  description: string;
  featured?: boolean;
  category?: string;
  badge?: string;
  image?: string;
};

export type CourseTextFaq = {
  question: string;
  answer: string;
};

export type CourseHighlight = {
  index: string;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
};

export type CourseAudienceCard = {
  index: string;
  title: string;
  description: string;
  image?: string;
  tagline?: string;
};

export type CoursePageConfig = {
  slug: string;
  programmeTitle: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    location: string;
    intake: string;
    title: string;
    emphasis: string;
    description: string;
    videoId: string;
    backgroundVideo: string;
    posterVideoId?: string;
    primaryCta: CourseCta;
    secondaryCta?: CourseCta;
    stats: CourseStat[];
    meta: CourseMetaItem[];
  };
  pillars?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    description?: string;
    items: CoursePillar[];
  };
  inlineCtas: CourseInlineCta[];
  timeline?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    phases: CourseTimelinePhase[];
  };
  fees?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    badge: string;
    intake: string;
    description: string;
    lines: CourseFeeLine[];
    scholarships: CourseScholarship[];
    note?: string;
  };
  paths?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    description: string;
    items: CoursePath[];
  };
  capstones?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    description: string;
    variant?: "grid" | "showcase";
    items: CourseCapstone[];
  };
  highlights?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    items: CourseHighlight[];
  };
  audience?: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    description: string;
    items: CourseAudienceCard[];
    footnote?: string;
  };
  faqs: {
    eyebrow: string;
    statement: string;
    emphasis: string;
    description?: string;
    items: CourseTextFaq[];
  };
  applicationForm?: {
    title: string;
    headline?: string;
  };
  sections: {
    placement: boolean;
    mentors: boolean;
    challenges: boolean;
    studentStories: boolean;
    campus: boolean;
    /** fullscreen = homepage-style edge-to-edge campus hero; tabs = program tabbed gallery */
    campusStyle?: "fullscreen" | "tabs";
    reels: boolean;
    admissions: boolean;
    applicationForm?: boolean;
    visualStory?: boolean;
  };
};
