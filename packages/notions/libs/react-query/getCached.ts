import { readFile } from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";

import { NOTION_REVALIDATE_SECONDS } from "../../constants";
import { getPosts } from "../../apis";
import { filterPosts } from "../../utils/notion";
import { FilterPostsOptions } from "../../utils/notion/filterPosts";
import { TPostType, TPosts } from "../../types";
import { getCachedPosts } from "./getCachePosts";
import { getCachedPages } from "./getCachedPages";
import { getCachedLibraries } from "./getCacheLibrary";

interface Props {
  type?: TPostType;
}

export const NOTION_CONTENT_CACHE_TAG = "notion-content";

const DATA_CACHE_REVALIDATE_SECONDS = NOTION_REVALIDATE_SECONDS;
const SNAPSHOT_FILE_PATH = path.join(
  process.cwd(),
  ".cache",
  "notion-content-snapshot.json",
);

const filterOptionsByType: Record<TPostType, FilterPostsOptions> = {
  Post: {
    acceptStatus: ["Public"],
    acceptType: ["Post"],
  },
  Paper: {
    acceptStatus: ["Public"],
    acceptType: ["Paper"],
  },
  Page: {
    acceptStatus: ["Public"],
    acceptType: ["Page"],
  },
  Project: {
    acceptStatus: ["Public"],
    acceptType: ["Project"],
  },
  Library: {
    acceptStatus: ["Public"],
    acceptType: ["Library"],
  },
};

const getCachedContent = unstable_cache(
  async (): Promise<TPosts> =>
    filterPosts(await getPosts(), {
      acceptStatus: ["Public"],
      acceptType: ["Post", "Page", "Library", "Paper", "Project"],
    }),
  ["notion-published-content-v3"],
  {
    revalidate: DATA_CACHE_REVALIDATE_SECONDS,
    tags: [NOTION_CONTENT_CACHE_TAG],
  },
);

function getRuntimeCachedContent(type: TPostType) {
  return getCachedContent()
    .then((posts) => filterPosts(posts, filterOptionsByType[type]))
    .catch(async (error) => {
      const snapshotPosts = await getSnapshotContent(type);

      if (snapshotPosts) {
        console.warn("[notion:getCached] serving snapshot fallback", {
          type,
          count: snapshotPosts.length,
          message: error instanceof Error ? error.message : String(error),
        });
        return snapshotPosts;
      }

      throw error;
    });
}

async function getSnapshotContent(type: TPostType): Promise<TPosts | null> {
  try {
    const rawSnapshot = await readFile(SNAPSHOT_FILE_PATH, "utf8");
    const parsedSnapshot = JSON.parse(rawSnapshot) as {
      posts?: TPosts;
    };
    const posts = Array.isArray(parsedSnapshot?.posts)
      ? parsedSnapshot.posts
      : [];

    if (!posts.length) {
      return null;
    }

    return filterPosts(posts, filterOptionsByType[type]);
  } catch (_error) {
    return null;
  }
}

export default function getCached({ type = "Post" }: Props = {}) {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (!isBuild) {
    return getRuntimeCachedContent(type);
  }

  if (type === "Page") return getCachedPages(isBuild);
  if (type === "Library") return getCachedLibraries(isBuild);
  return getCachedPosts(isBuild);
}
