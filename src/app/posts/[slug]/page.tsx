import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts, getRelatedPostsByTags } from "../../../shared/content/queries";
import { Tag } from "../../../shared/components/Tag";
import { Breadcrumbs } from "../../../shared/components/Breadcrumbs";
import { ReadingTimeWidget } from "../../../shared/components/ReadingTimeWidget";
import { MDXContent } from "../../../shared/components/MDXContent";
import { Card } from "../../../shared/components/Card";

type PostDetailPageProps = {
  params: { slug: string };
};

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPostsByTags(post.tags, 3).filter((item) => item.slug !== post.slug);
  const sortedPosts = getPosts().sort((a, b) => b.date.localeCompare(a.date));
  const currentIndex = sortedPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <Breadcrumbs items={[{ label: "Posts", href: "/posts" }, { label: post.title }]} />

      <header className="mt-8 space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-soft">{post.date}</p>
        <h1 className="text-4xl font-semibold leading-tight">{post.title}</h1>
        <p className="text-lg text-muted">{post.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <ReadingTimeWidget minutes={post.readingTimeMinutes} />
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </header>

      <MDXContent content={post.content} className="mt-10" />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {previousPost ? (
          <Link href={`/posts/${previousPost.slug}`} className="focus-ring">
            <Card as="article" className="p-5 transition hover:-translate-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-soft">Previous</p>
              <h3 className="mt-2 text-lg font-semibold">{previousPost.title}</h3>
            </Card>
          </Link>
        ) : null}
        {nextPost ? (
          <Link href={`/posts/${nextPost.slug}`} className="focus-ring">
            <Card as="article" className="p-5 transition hover:-translate-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-soft">Next</p>
              <h3 className="mt-2 text-lg font-semibold">{nextPost.title}</h3>
            </Card>
          </Link>
        ) : null}
      </div>

      {relatedPosts.length ? (
        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Related Posts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((item) => (
              <Link key={item.slug} href={`/posts/${item.slug}`} className="focus-ring">
                <Card as="article" className="flex h-full flex-col gap-4 p-5 transition hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs text-soft">{item.date}</p>
                  </div>
                  <p className="text-sm text-muted">{item.description}</p>
                  <ReadingTimeWidget minutes={item.readingTimeMinutes} />
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
