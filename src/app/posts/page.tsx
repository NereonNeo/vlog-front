"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "../../shared/components/Card";
import { EmptyState } from "../../shared/components/EmptyState";
import { FilterBar } from "../../shared/components/FilterBar";
import { ReadingTimeWidget } from "../../shared/components/ReadingTimeWidget";
import { Tag } from "../../shared/components/Tag";
import { getPosts } from "../../shared/content/queries";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Reading time", value: "reading" },
];

export default function PostsPage() {
  const posts = getPosts();
  const [searchValue, setSearchValue] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState(sortOptions[0].value);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase().trim()))
      .filter((post) => (activeTags.length ? activeTags.every((tag) => post.tags.includes(tag)) : true))
      .sort((a, b) => {
        if (activeSort === "oldest") {
          return a.date.localeCompare(b.date);
        }
        if (activeSort === "reading") {
          return a.readingTimeMinutes - b.readingTimeMinutes;
        }
        return b.date.localeCompare(a.date);
      });
  }, [posts, searchValue, activeTags, activeSort]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">Posts</h1>
        <p className="text-sm text-muted">Notes, case studies, and guides.</p>
      </div>

      <div className="mt-10 space-y-6">
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          searchPlaceholder="Search posts"
          tags={allTags.map((tag) => ({ label: tag, value: tag }))}
          activeTags={activeTags}
          onToggleTag={(tag) => setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]))}
          sorts={sortOptions}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filteredPosts.length ? (
          filteredPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="focus-ring">
              <Card as="article" className="flex h-full flex-col gap-4 p-6 transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2 text-xs text-soft">{post.date}</p>
                  </div>
                  <ReadingTimeWidget minutes={post.readingTimeMinutes} />
                </div>
                <p className="text-sm text-muted">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <EmptyState title="No posts found" description="Adjust filters or try another search term." />
        )}
      </div>
    </main>
  );
}
