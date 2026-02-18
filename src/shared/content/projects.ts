import type { Project } from "../types/content";

export const projects: Project[] = [
  {
    slug: "obsidian-console",
    title: "Obsidian Console",
    summary: "Admin cockpit for multi-tenant SaaS with real-time health dashboards.",
    description:
      "A control center for ops and support teams: incident signals, tenant status, and live system metrics in one place. Designed for clarity under pressure.",
    status: "active",
    period: { start: "2024-03" },
    roles: ["Frontend", "Design System", "Performance"],
    stack: ["Next.js", "TypeScript", "Tailwind", "React Query", "Recharts"],
    links: [
      { label: "Case study", href: "/projects/obsidian-console" },
      { label: "Demo", href: "https://example.com/obsidian-console" },
    ],
    featured: true,
    highlights: [
      "Built a unified dashboard grid with real-time status updates.",
      "Reduced initial load by 35% via route-level code splitting.",
      "Designed a reusable card system with strict spacing and focus states.",
    ],
    relatedPostSlugs: ["dashboard-clarity", "perf-budget-playbook"],
  },
  {
    slug: "forge-analytics",
    title: "Forge Analytics",
    summary: "Product analytics UI for event funnels and cohort exploration.",
    description:
      "An analytics workspace focused on speed and analyst flow. The UI emphasizes consistency between filters, charts, and drill-down interactions.",
    status: "maintained",
    period: { start: "2023-06", end: "2024-02" },
    roles: ["Frontend", "Architecture"],
    stack: ["React", "TypeScript", "Vite", "D3", "Zustand"],
    links: [
      { label: "Case study", href: "/projects/forge-analytics" },
      { label: "Demo", href: "https://example.com/forge-analytics" },
    ],
    featured: true,
    highlights: [
      "Designed a filter grammar that scales to nested cohorts.",
      "Standardized chart theming to avoid visual noise.",
      "Implemented cross-filter performance optimizations for large datasets.",
    ],
    relatedPostSlugs: ["filter-systems", "dashboard-clarity"],
  },
  {
    slug: "shard-ui",
    title: "Shard UI",
    summary: "Internal design system and component library.",
    description:
      "A composable UI library with strict spacing, typography, and interaction rules. Built for teams that want consistent output with minimal overhead.",
    status: "active",
    period: { start: "2024-08" },
    roles: ["Design System", "Frontend"],
    stack: ["React", "TypeScript", "Storybook", "Chromatic", "CSS Tokens"],
    links: [
      { label: "Case study", href: "/projects/shard-ui" },
      { label: "Repo", href: "https://example.com/shard-ui" },
    ],
    featured: true,
    highlights: [
      "Defined token architecture for colors, type scale, and radii.",
      "Built composable primitives with accessibility baked in.",
      "Introduced visual regression testing for UI changes.",
    ],
    relatedPostSlugs: ["design-tokens-101", "a11y-checklist"],
  },
  {
    slug: "nightwatch-ops",
    title: "Nightwatch Ops",
    summary: "Incident response panel for on-call rotations.",
    description: "A lightweight incident tracking surface with fast triage flows, threaded notes, and decision checkpoints.",
    status: "archived",
    period: { start: "2022-11", end: "2023-04" },
    roles: ["Frontend", "UX"],
    stack: ["Next.js", "TypeScript", "SWR", "Radix UI"],
    links: [{ label: "Case study", href: "/projects/nightwatch-ops" }],
    featured: false,
    highlights: [
      "Created a triage layout that reduced time-to-signal.",
      "Added keyboard-first navigation for on-call speed.",
      "Standardized empty states and error messaging.",
    ],
    relatedPostSlugs: ["triage-ux"],
  },
];
