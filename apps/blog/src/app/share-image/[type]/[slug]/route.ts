import { NextRequest, NextResponse } from "next/server";
import { NOTION_DETAIL_REVALIDATE_SECONDS } from "@blog/notions/constants";
import getCached from "@blog/notions/libs/react-query/getCached";
import type { TPostType } from "@blog/notions/types";
import { getAbsoluteUrl } from "@libs/seo";

export const runtime = "nodejs";

const typeMap: Record<string, TPostType> = {
  post: "Post",
  page: "Page",
  library: "Library",
};

const cacheControlValue = `public, max-age=0, s-maxage=${NOTION_DETAIL_REVALIDATE_SECONDS}, stale-while-revalidate=${NOTION_DETAIL_REVALIDATE_SECONDS}`;

function getFallbackImage(request: NextRequest) {
  return new URL(getAbsoluteUrl("/main_img.png"), request.url);
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      type: string;
      slug: string;
    };
  },
) {
  const postType = typeMap[params.type];

  if (!params.slug || !postType) {
    return NextResponse.redirect(getFallbackImage(request));
  }

  try {
    const posts = await getCached({ type: postType });
    const post = posts.find((item) => item.slug === params.slug);
    const sourceImage = post?.thumbnail?.replace(/&amp;/g, "&");

    if (!sourceImage) {
      return NextResponse.redirect(getFallbackImage(request));
    }

    const imageResponse = await fetch(sourceImage, {
      headers: {
        "user-agent": "Mozilla/5.0",
      },
      next: {
        revalidate: NOTION_DETAIL_REVALIDATE_SECONDS,
      },
      redirect: "follow",
    });

    if (!imageResponse.ok || !imageResponse.body) {
      return NextResponse.redirect(getFallbackImage(request));
    }

    return new NextResponse(imageResponse.body, {
      status: 200,
      headers: {
        "content-type":
          imageResponse.headers.get("content-type") || "image/jpeg",
        "cache-control": cacheControlValue,
      },
    });
  } catch (error) {
    console.error("[share-image-route] failed to resolve image", {
      type: params.type,
      slug: params.slug,
      message: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.redirect(getFallbackImage(request));
  }
}
