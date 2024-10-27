import { TPosts } from "../../types";
import { filterPosts } from "../../utils/notion";
import { getPosts } from "../../apis";

let cachedPosts: TPosts | null = null;

export async function getCachedPosts(isBuild: boolean): Promise<TPosts> {
  return isBuild ? getSSGPosts() : getFreshPosts();
}

export async function getSSGPosts(): Promise<TPosts> {
  if (!cachedPosts) {
    cachedPosts = filterPosts(await getPosts());
  }
  return cachedPosts;
}

export async function getFreshPosts(): Promise<TPosts> {
  return filterPosts(await getPosts());
}
