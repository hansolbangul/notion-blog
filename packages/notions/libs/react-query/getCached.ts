import { TPostType } from "../../types";
import { getCachedPosts } from "./getCachePosts";
import { getCachedPages } from "./getCachedPages";
import { getCachedLibraries } from "./getCacheLibrary";

interface Props {
  type?: TPostType;
}

export default function getCached({ type = "Post" }: Props = {}) {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (type === "Page") return getCachedPages(isBuild);
  if (type === "Library") return getCachedLibraries(isBuild);
  return getCachedPosts(isBuild);
}
