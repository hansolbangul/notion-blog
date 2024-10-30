import { TPosts } from "../../types";
import { filterPosts } from "../../utils/notion";
import { getPosts } from "../../apis";
import { FilterPostsOptions } from "../../utils/notion/filterPosts";

let cachedLibraries: TPosts | null = null;

const pageOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Library"],
};

export async function getCachedLibraries(isBuild: boolean): Promise<TPosts> {
  return isBuild ? getSSGLibrary() : getFreshLibrary();
}

export async function getSSGLibrary(): Promise<TPosts> {
  if (!cachedLibraries) {
    cachedLibraries = filterPosts(await getPosts(), pageOption);
  }
  return cachedLibraries;
}

export async function getFreshLibrary(): Promise<TPosts> {
  return filterPosts(await getPosts(), pageOption);
}
