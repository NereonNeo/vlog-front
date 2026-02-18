import Link from "next/link";
import { heroContent } from "../shared/content/hero";
import { skills } from "../shared/content/skills";
import { getFeaturedProjects, getLatestPosts } from "../shared/content/queries";
import { Card } from "../shared/components/Card";
import { Tag } from "../shared/components/Tag";
import { Badge } from "../shared/components/Badge";
import { ReadingTimeWidget } from "../shared/components/ReadingTimeWidget";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const latestPosts = getLatestPosts(3);

  return (
    <main className="grain grid-overlay">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-soft">{heroContent.role}</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{heroContent.name}</h1>
            <p className="text-lg text-muted">{heroContent.role}</p>
            <div className="space-y-3 text-base text-muted">
              {heroContent.summary.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {heroContent.ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="focus-ring rounded-full border border-[var(--border-soft)] px-6 py-3 text-xs uppercase tracking-[0.4em] text-white transition hover:border-[var(--accent)]"
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
          <Card as="section" className="p-8">
            <h2 className="text-sm uppercase tracking-[0.4em] text-soft">Core Focus</h2>
            <p className="mt-4 text-xl font-semibold">Interfaces that stay calm under load.</p>
            <p className="mt-4 text-sm text-muted">
              I build product surfaces that are readable, fast, and deliberate — especially when the data is noisy.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.slice(0, 6).map((skill) => (
                <Tag key={skill} label={skill} />
              ))}
            </div>
          </Card>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <Link href="/projects" className="focus-ring text-sm uppercase tracking-[0.3em] text-soft">
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="focus-ring">
                <Card as="article" className="flex h-full flex-col gap-6 p-6 transition hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Badge label={project.status} variant={project.status} />
                  </div>
                  <p className="text-sm text-muted">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((stack) => (
                      <Tag key={stack} label={stack} />
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Posts</h2>
            <Link href="/posts" className="focus-ring text-sm uppercase tracking-[0.3em] text-soft">
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="focus-ring">
                <Card as="article" className="flex h-full flex-col gap-4 p-6 transition hover:-translate-y-1">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-xs text-soft">{post.date}</p>
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

        <section className="surface-muted flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Let us build something sharp.</h2>
            <p className="mt-2 text-sm text-muted">Open to product and design system work.</p>
          </div>
          <Link
            href="mailto:hello@yakub.dev"
            className="focus-ring rounded-full border border-[var(--border-soft)] px-6 py-3 text-xs uppercase tracking-[0.4em] text-white transition hover:border-[var(--accent)]"
          >
            Contact
          </Link>
        </section>
      </section>
    </main>
  );
}
