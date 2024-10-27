import { TPosts } from "../../types";
import { filterPosts } from "../../utils/notion";
import { getPosts } from "../../apis";
import { FilterPostsOptions } from "../../utils/notion/filterPosts";

let cachedPages: TPosts | null = null;

const pageOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Page"],
};

export async function getCachedPages(isBuild: boolean): Promise<TPosts> {
  return isBuild ? getSSGPages() : getFreshPages();
}

export async function getSSGPages(): Promise<TPosts> {
  if (!cachedPages) {
    cachedPages = filterPosts(await getPosts(), pageOption);
  }
  return cachedPages;
}

export async function getFreshPages(): Promise<TPosts> {
  return filterPosts(await getPosts(), pageOption);
}
