import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import {
  clearNotionPostsCache,
  clearNotionRecordMapCache,
} from "@blog/notions/apis";
import { getAllPublishedContent, isIndexablePost } from "@libs/content";
import { getPostPath } from "@libs/seo";

function collectRevalidateTargets(paths: string[]) {
  return Array.from(new Set(paths));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    clearNotionPostsCache();
    clearNotionRecordMapCache();

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    const { posts, pages, libraries } = await getAllPublishedContent();
    const targets = collectRevalidateTargets([
      "/",
      "/sitemap.xml",
      ...[...posts, ...pages, ...libraries]
        .filter(isIndexablePost)
        .map((post) => getPostPath(post)),
    ]);

    targets.forEach((target) => {
      revalidatePath(target);
    });

    return NextResponse.json({
      revalidated: true,
      count: targets.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
