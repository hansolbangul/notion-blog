import type { MetadataRoute } from "next";
import {
  getAllPublishedContent,
  getContentLastModified,
  isIndexablePost,
  sortByRecent,
} from "@libs/content";
import { getAbsoluteUrl, getPostPath, getModifiedDate } from "@libs/seo";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, pages, libraries } = await getAllPublishedContent();
  const indexableContent = sortByRecent(
    [...posts, ...pages, ...libraries].filter(isIndexablePost),
  );
  const lastModified = getContentLastModified(indexableContent);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: getAbsoluteUrl("/services") },
    {
      url: getAbsoluteUrl("/"),
      lastModified,
    },
  ];

  const contentRoutes: MetadataRoute.Sitemap = indexableContent.map((post) => ({
    url: getAbsoluteUrl(getPostPath(post)),
    lastModified: getModifiedDate(post),
  }));

  return Array.from(
    new Map(
      [...staticRoutes, ...contentRoutes].map((entry) => [entry.url, entry]),
    ).values(),
  );
}
