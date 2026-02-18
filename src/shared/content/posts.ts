import type { Post } from "../types/content";

export const posts: Post[] = [
  {
    slug: "dashboard-clarity",
    title: "Dashboard Clarity: Layout Rules That Survive Scale",
    description: "A practical set of layout constraints that keep dashboards readable under load.",
    date: "2024-12-12",
    tags: ["UI", "Layout", "Product"],
    content: `## Why clarity breaks
As widgets grow, their visual weight becomes uneven. A strict grid, consistent spacing, and predictable typography prevent the UI from feeling chaotic.

## Rules I follow
- Fixed vertical rhythm
- One primary action per panel
- Strong typographic hierarchy

## Closing
Design for the moments when everything is loud.`,
  },
  {
    slug: "perf-budget-playbook",
    title: "Performance Budget Playbook for Product Teams",
    description: "Define budgets early, enforce them automatically, and avoid late performance debt.",
    date: "2025-01-27",
    tags: ["Performance", "Next.js", "Engineering"],
    content: `## What a budget really is
Not just a number, but a contract. Decide which experiences must never regress.

## What to measure
- TTFB and LCP on key routes
- JS payload by route
- CLS spikes from dynamic content

## Closing
Budgets are leverage, not bureaucracy.`,
  },
  {
    slug: "design-tokens-101",
    title: "Design Tokens 101: Discipline Without Overhead",
    description: "A simple token system that keeps teams aligned and avoids over-engineering.",
    date: "2024-10-03",
    tags: ["Design System", "Tokens", "CSS"],
    content: `## Start small
Color, type scale, and spacing cover 80% of the decisions.

## Naming that scales
Avoid semantic drift: keep tokens functional, not poetic.

## Closing
Tokens are a decision ledger for the UI.`,
  },
  {
    slug: "a11y-checklist",
    title: "Accessibility Checklist That Actually Gets Used",
    description: "A small checklist that fits into everyday frontend work.",
    date: "2025-02-18",
    tags: ["Accessibility", "Frontend", "Checklist"],
    content: `## The real goal
Make the default path accessible without making the process heavy.

## The short list
- Visible focus states
- Proper heading order
- Button vs link semantics
- Color contrast on key components

## Closing
If it is too big, it will not be used.`,
  },
];
