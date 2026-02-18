"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "../../shared/components/Badge";
import { Card } from "../../shared/components/Card";
import { EmptyState } from "../../shared/components/EmptyState";
import { FilterBar } from "../../shared/components/FilterBar";
import { Tag } from "../../shared/components/Tag";
import { getProjects } from "../../shared/content/queries";
import type { ProjectStatus } from "../../shared/types/content";

const statusOptions: Array<{ label: string; value: ProjectStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Maintained", value: "maintained" },
  { label: "Archived", value: "archived" },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Most impactful", value: "impact" },
  { label: "By status", value: "status" },
];

function parsePeriodStart(period: string) {
  return new Date(`${period}-01`).getTime();
}

export default function ProjectsPage() {
  const projects = getProjects();
  const [searchValue, setSearchValue] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "all">("all");
  const [activeSort, setActiveSort] = useState(sortOptions[0].value);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.stack.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => project.title.toLowerCase().includes(searchValue.toLowerCase().trim()))
      .filter((project) => (activeStatus === "all" ? true : project.status === activeStatus))
      .filter((project) => (activeTags.length ? activeTags.every((tag) => project.stack.includes(tag)) : true))
      .sort((a, b) => {
        if (activeSort === "impact") {
          return Number(b.featured) - Number(a.featured);
        }
        if (activeSort === "status") {
          return a.status.localeCompare(b.status);
        }
        return parsePeriodStart(b.period.start) - parsePeriodStart(a.period.start);
      });
  }, [projects, searchValue, activeStatus, activeTags, activeSort]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="text-sm text-muted">Selected work with focus on interfaces and systems.</p>
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => {
            const isActive = status.value === activeStatus;
            return (
              <button
                key={status.value}
                type="button"
                onClick={() => setActiveStatus(status.value)}
                className={`chip focus-ring transition ${isActive ? "border-[var(--accent)] text-white shadow-[0_0_12px_var(--accent-soft)]" : ""}`}
              >
                {status.label}
              </button>
            );
          })}
        </div>

        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search projects"
          tags={allTags.map((tag) => ({ label: tag, value: tag }))}
          activeTags={activeTags}
          onToggleTag={(tag) => setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]))}
          sorts={sortOptions}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filteredProjects.length ? (
          filteredProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className="focus-ring">
              <Card as="article" className="flex h-full flex-col gap-6 p-6 transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="mt-2 text-sm text-muted">{project.summary}</p>
                  </div>
                  <Badge label={project.status} variant={project.status} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.slice(0, 6).map((stack) => (
                    <Tag key={stack} label={stack} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-soft">
                  {project.roles.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <EmptyState title="No projects found" description="Adjust filters or try another search term." />
        )}
      </div>
    </main>
  );
}
