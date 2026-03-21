import { getPosts } from "@blog/notions/apis";
import { TPost, TPosts } from "@blog/notions/types";
import { filterPosts } from "@blog/notions/utils/notion";

const publicStatus = ["Public"] as const;

export async function getAllPublishedContent() {
  const rawPosts = await getPosts();

  return {
    posts: filterPosts(rawPosts, {
      acceptStatus: [...publicStatus],
      acceptType: ["Post"],
    }),
    pages: filterPosts(rawPosts, {
      acceptStatus: [...publicStatus],
      acceptType: ["Page"],
    }),
    libraries: filterPosts(rawPosts, {
      acceptStatus: [...publicStatus],
      acceptType: ["Library"],
    }),
  };
}

export function getContentLastModified(posts: TPosts) {
  const timestamps = posts
    .map((post) => post.lastEditedTime || post.createdTime || post.date?.start_date)
    .filter(Boolean)
    .map((value) => new Date(value as string).getTime())
    .filter((value) => !Number.isNaN(value));

  if (!timestamps.length) return new Date();
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
