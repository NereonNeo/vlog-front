const fallbackBaseUrl = "http://localhost:3000";

export const siteConfig = {
  title: "Yakub — Frontend Engineer",
  description: "Projects, posts, and engineering notes by Yakub.",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? fallbackBaseUrl,
};
