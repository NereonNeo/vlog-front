import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedPostsForProject } from "../../../shared/content/queries";
import { Card } from "../../../shared/components/Card";
import { Tag } from "../../../shared/components/Tag";
import { Badge } from "../../../shared/components/Badge";
import { Breadcrumbs } from "../../../shared/components/Breadcrumbs";
import { ReadingTimeWidget } from "../../../shared/components/ReadingTimeWidget";

type ProjectDetailPageProps = {
  params: { slug: string };
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedPosts = getRelatedPostsForProject(project, 3);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.title }]} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge label={project.status} variant={project.status} />
              <span className="text-xs uppercase tracking-[0.3em] text-soft">
                {project.period.start}
                {project.period.end ? ` — ${project.period.end}` : ""}
              </span>
            </div>
            <h1 className="text-4xl font-semibold">{project.title}</h1>
            <p className="text-lg text-muted">{project.summary}</p>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-full border border-[var(--border-soft)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:border-[var(--accent)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="text-sm text-muted">{project.description}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">My Contribution</h2>
            <ul className="space-y-2 text-sm text-muted">
              {project.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((stack) => (
                <Tag key={stack} label={stack} />
              ))}
            </div>
          </section>

          {relatedPosts.length ? (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Related Posts</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedPosts.map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} className="focus-ring">
                    <Card as="article" className="flex h-full flex-col gap-4 p-5 transition hover:-translate-y-1">
                      <div>
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="mt-1 text-xs text-soft">{post.date}</p>
                      </div>
                      <p className="text-sm text-muted">{post.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Tag key={tag} label={tag} />
                        ))}
                      </div>
                      <ReadingTimeWidget minutes={post.readingTimeMinutes} />
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <Card as="section" className="p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-soft">Project Facts</h3>
            <div className="mt-4 space-y-3 text-sm text-muted">
              <div className="flex items-center justify-between">
                <span>Status</span>
                <span className="text-white">{project.status}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Period</span>
                <span className="text-white">
                  {project.period.start}
                  {project.period.end ? ` — ${project.period.end}` : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Roles</span>
                <span className="text-white">{project.roles.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Stack</span>
                <span className="text-white">{project.stack.length} items</span>
              </div>
            </div>
          </Card>

          <Card as="section" className="p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-soft">Highlights</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {project.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </main>
  );
}
