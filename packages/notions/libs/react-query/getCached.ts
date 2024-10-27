import { TPostType } from "../../types";
import { getCachedPosts } from "./getCachePosts";
import { getCachedPages } from "./getCachedPages";

interface Props {
  type?: TPostType;
}

export default function getCached({ type = "Post" }: Props = {}) {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  if (type === "Page") return getCachedPages(isBuild);
  return getCachedPosts(isBuild);
}
