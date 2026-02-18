import { projects } from "./projects";
import { posts } from "./posts";
import type { Post, Project } from "../types/content";
import { getReadingTimeMinutes } from "../lib/reading-time";

export type PostWithReadingTime = Post & { readingTimeMinutes: number };

export function getProjects(): Project[] {
  return [...projects];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getPosts(): PostWithReadingTime[] {
  return posts.map((post) => ({
    ...post,
    readingTimeMinutes: getReadingTimeMinutes(post.content),
  }));
}

export function getPostBySlug(slug: string): PostWithReadingTime | undefined {
  const post = posts.find((item) => item.slug === slug);
  if (!post) return undefined;
  return {
    ...post,
    readingTimeMinutes: getReadingTimeMinutes(post.content),
  };
}

export function getLatestPosts(limit = 3): PostWithReadingTime[] {
  return getPosts()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export function getRelatedPostsByTags(tags: string[], limit = 3): PostWithReadingTime[] {
  return getPosts()
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit);
}

export function getRelatedPostsForProject(project: Project, limit = 3): PostWithReadingTime[] {
  if (project.relatedPostSlugs?.length) {
    return getPosts()
      .filter((post) => project.relatedPostSlugs?.includes(post.slug))
      .slice(0, limit);
  }

  return getRelatedPostsByTags(project.stack, limit);
}
