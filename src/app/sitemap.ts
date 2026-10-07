import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/constants";

const SITEMAP_SLUGS_QUERY = `{
  "announcements": *[_type == "announcement" && status == "active"]{ "slug": slug.current, _updatedAt },
  "events": *[_type == "event" && status != "cancelled"]{ "slug": slug.current, _updatedAt },
  "homilies": *[_type == "homily"]{ "slug": slug.current, _updatedAt }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch<{
    announcements: { slug: string; _updatedAt: string }[];
    events: { slug: string; _updatedAt: string }[];
    homilies: { slug: string; _updatedAt: string }[];
  }>(SITEMAP_SLUGS_QUERY);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/mass-sacraments`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/ministries`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/events`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/homilies`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/prayer-request`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/give`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...data.announcements.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...data.events.map((item) => ({
      url: `${SITE_URL}/events/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...data.homilies.map((item) => ({
      url: `${SITE_URL}/homilies/${item.slug}`,
      lastModified: new Date(item._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
