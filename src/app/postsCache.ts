import { TPosts } from "@/src/types";
import { getPosts } from "@/src/apis";
import { filterPosts } from "@libs/utils/notion";

let cachedPosts: TPosts | null = null;

export async function getCachedPosts(): Promise<TPosts> {
  if (!cachedPosts) {
    cachedPosts = filterPosts(await getPosts());
  }
  return cachedPosts;
}