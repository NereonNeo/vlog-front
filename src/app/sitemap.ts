import type { MetadataRoute } from "next";
import { siteConfig } from "../shared/config/site";
import { projects } from "../shared/content/projects";
import { posts } from "../shared/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/posts"].map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteConfig.baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
