import { TPosts } from "../../types";
import { filterPosts } from "../../utils/notion";
import { getPosts } from "../../apis";

let cachedPosts: TPosts | null = null;

export async function getCachedPosts(): Promise<TPosts> {
  if (!cachedPosts) {
    cachedPosts = filterPosts(await getPosts());
  }
  return cachedPosts;
}
