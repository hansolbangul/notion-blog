import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import getCached from "@blog/notions/libs/react-query/getCached";
import { getAbsoluteImageUrl } from "@libs/seo";
import type { TPostType } from "@blog/notions/types";

const size = {
  width: 1200,
  height: 630,
};

const font = readFile(path.join(process.cwd(), "public/fonts/Jua-Regular.ttf"));

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") || "home";
  const slug = searchParams.get("slug");
  let title = searchParams.get("title") || "istp.builders";
  let eyebrow = searchParams.get("eyebrow") || "Frontend Archive";
  const imageParam = searchParams.get("image");
  let thumbnail: string | null = imageParam
    ? getAbsoluteImageUrl(imageParam)
    : null;
  const fontData = await font;

  if (
    !thumbnail &&
    slug &&
    (kind === "post" || kind === "page" || kind === "library")
  ) {
    const typeMap: Record<string, TPostType> = {
      post: "Post",
      page: "Page",
      library: "Library",
    };

    const posts = await getCached({ type: typeMap[kind] });
    const post = posts.find((item) => item.slug === slug);

    if (post) {
      title = post.title;
      eyebrow = post.type?.[0] || "Post";
      thumbnail = post.thumbnail ? getAbsoluteImageUrl(post.thumbnail) : null;
    }
  } else if (kind === "home") {
    eyebrow = "Frontend Archive";
  }

  const icon = await readFile(
    path.join(process.cwd(), "public/brand/chibi/poses-transparent.png"),
  );
  if (kind === "icon") {
    return new ImageResponse(
      <div style={{ display: "flex", width: 96, height: 96, overflow: "hidden", position: "relative" }}>
        <img src={`data:image/png;base64,${icon.toString("base64")}`} width={1254 * 96 / 310} height={1254 * 96 / 310} style={{ position: "absolute", left: -65 * 96 / 310, top: -100 * 96 / 310 }} alt="" />
      </div>,
      { width: 96, height: 96, headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" } },
    );
  }
  if (kind === "home") {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#f7f5ef",
            color: "#262724",
            padding: "60px 64px",
            fontFamily: "Jua",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 650,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#52672b",
                marginBottom: 28,
              }}
            >
              만들면서 배우는 개발자의 기록
            </div>
            <div style={{ display: "flex", fontSize: 78, letterSpacing: -3 }}>
              istp.builders
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 29,
                color: "#6b6d64",
                marginTop: 24,
              }}
            >
              직접 만들고, 부딪히고, 기록합니다.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: "#52672b",
                marginTop: 48,
              }}
            >
              React · TypeScript · Next.js · Side projects
            </div>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: 44,
              top: 60,
              width: 380,
              height: 460,
              overflow: "hidden",
            }}
          >
            <img
              src={`data:image/png;base64,${icon.toString("base64")}`}
              width={1254}
              height={1254}
              style={{ position: "absolute", left: -430, top: -155 }}
              alt=""
            />
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: 66,
              top: 38,
              padding: "13px 25px",
              background: "#c5d88a",
              transform: "rotate(4deg)",
              fontSize: 24,
            }}
          >
            일단, 만들어보자.
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 40,
              left: 64,
              right: 64,
              borderTop: "1px solid #dcded3",
              paddingTop: 22,
              justifyContent: "space-between",
              fontSize: 21,
              color: "#6b6d64",
            }}
          >
            <span>hansolbangul.com</span>
            <span>오늘도 한 줄, 한 걸음.</span>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [{ name: "Jua", data: fontData, style: "normal", weight: 400 }],
      },
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f7f5ef",
          color: "#262724",
          padding: "54px 64px",
          flexDirection: "column",
          fontFamily: "Jua",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              overflow: "hidden",
              position: "relative",
              borderRadius: 14,
            }}
          >
            <img
              src={`data:image/png;base64,${icon.toString("base64")}`}
              width={(1254 * 64) / 310}
              height={(1254 * 64) / 310}
              style={{
                position: "absolute",
                left: (-65 * 64) / 310,
                top: (-100 * 64) / 310,
              }}
              alt=""
            />
          </div>
          <span style={{ fontSize: 30 }}>istp.builders</span>
          <span style={{ marginLeft: "auto", fontSize: 18, color: "#52672b" }}>
            {eyebrow}
          </span>
        </div>
        <div
          style={{ display: "flex", flex: 1, alignItems: "center", gap: 42 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 25,
            }}
          >
            <div style={{ width: 65, height: 7, background: "#c5d88a" }} />
            <div
              style={{
                fontSize: title.length > 45 ? 45 : 58,
                lineHeight: 1.3,
                wordBreak: "keep-all",
              }}
            >
              {title}
            </div>
          </div>
          {thumbnail && (
            <img
              src={thumbnail}
              width={260}
              height={240}
              style={{ objectFit: "cover", borderRadius: 4 }}
              alt=""
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 25,
            borderTop: "1px solid #dcded3",
            fontSize: 22,
            color: "#6b6d64",
          }}
        >
          <span>직접 만들고, 부딪히고, 기록합니다.</span>
          <span>HANSOL JI ↗</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Jua", data: fontData, style: "normal", weight: 400 }],
    },
  );
}
