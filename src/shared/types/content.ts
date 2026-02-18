export type ProjectStatus = "active" | "maintained" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectPeriod = {
  start: string;
  end?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: ProjectStatus;
  period: ProjectPeriod;
  roles: string[];
  stack: string[];
  links: ProjectLink[];
  featured: boolean;
  highlights: string[];
  relatedPostSlugs?: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  cover?: string;
};

export type HeroContent = {
  name: string;
  role: string;
  summary: string[];
  ctas: Array<{
    label: string;
    href: string;
  }>;
};
