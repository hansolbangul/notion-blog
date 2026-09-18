import { NextRequest, NextResponse } from "next/server";
import { getAbsoluteUrl } from "@libs/seo";

// Keep legacy image links working through the same resolver as current links.
export function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") || "post";
  const slug = request.nextUrl.searchParams.get("slug");
  const path =
    slug && ["post", "page", "library"].includes(type)
      ? `/share-image/${type}/${encodeURIComponent(slug)}`
      : "/api/og?v=chibi-3";
  return NextResponse.redirect(getAbsoluteUrl(path));
}
