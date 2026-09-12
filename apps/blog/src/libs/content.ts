import getCached from "@blog/notions/libs/react-query/getCached";
import { TPost, TPosts } from "@blog/notions/types";

export const EXCLUDED_PAGE_SLUGS = ["profile"] as const;

export function isExcludedPageSlug(slug?: string) {
  return (
    !!slug &&
    EXCLUDED_PAGE_SLUGS.includes(slug as (typeof EXCLUDED_PAGE_SLUGS)[number])
  );
}

export async function getAllPublishedContent() {
  const [posts, pages, libraries] = await Promise.all([
    getCached({ type: "Post" }),
    getCached({ type: "Page" }),
    getCached({ type: "Library" }),
  ]);
  return {
    posts,
    pages: pages.filter((post) => !isExcludedPageSlug(post.slug)),
    libraries,
  };
}

export function getContentLastModified(posts: TPosts) {
  const timestamps = posts
    .map(
      (post) =>
        post.lastEditedTime || post.createdTime || post.date?.start_date,
    )
    .filter(Boolean)
    .map((value) => new Date(value as string).getTime())
    .filter((value) => !Number.isNaN(value));

  if (!timestamps.length) return undefined;
  return new Date(Math.max(...timestamps));
}

export function sortByRecent(posts: TPosts) {
  return [...posts].sort((a, b) => {
    const left = new Date(
      a.lastEditedTime || a.date?.start_date || a.createdTime,
    ).getTime();
    const right = new Date(
      b.lastEditedTime || b.date?.start_date || b.createdTime,
    ).getTime();
    return right - left;
  });
}

export function isIndexablePost(post: TPost) {
  return !!post.slug && !!post.title;
}
