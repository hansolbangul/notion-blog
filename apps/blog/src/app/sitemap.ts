import type { MetadataRoute } from "next";
import { NOTION_REVALIDATE_SECONDS } from "@blog/notions/constants";
import {
  getAllPublishedContent,
  getContentLastModified,
  isIndexablePost,
  sortByRecent,
} from "@libs/content";
import { getAbsoluteUrl, getPostPath } from "@libs/seo";

export const revalidate = NOTION_REVALIDATE_SECONDS;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, pages, libraries } = await getAllPublishedContent();
  const indexableContent = sortByRecent(
    [...posts, ...pages, ...libraries].filter(isIndexablePost),
  );
  const lastModified = getContentLastModified(indexableContent);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified,
    },
    {
      url: getAbsoluteUrl("/tool/random"),
      lastModified,
    },
    {
      url: getAbsoluteUrl("/tool/uuid"),
      lastModified,
    },
    {
      url: getAbsoluteUrl("/tool/letter-count"),
      lastModified,
    },
    {
      url: getAbsoluteUrl("/tool/qr"),
      lastModified,
    },
  ];

  const contentRoutes: MetadataRoute.Sitemap = indexableContent.map((post) => ({
    url: getAbsoluteUrl(getPostPath(post)),
    lastModified:
      post.lastEditedTime || post.date?.start_date || post.createdTime,
  }));

  return [...staticRoutes, ...contentRoutes];
}
