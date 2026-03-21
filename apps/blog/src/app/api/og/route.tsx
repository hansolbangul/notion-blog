import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/server";
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
  let title = searchParams.get("title") || "데굴데굴 블로그";
  let eyebrow = searchParams.get("eyebrow") || "Frontend Archive";
  let thumbnail: string | null = null;
  const fontData = await font;

  if (
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

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f7f4ec 0%, #fffdf7 45%, #f3ece1 100%)",
          color: "#1f1a14",
          fontFamily: "Jua",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(203, 121, 61, 0.16), transparent 32%), radial-gradient(circle at bottom right, rgba(91, 60, 34, 0.12), transparent 28%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 42,
            left: 48,
            right: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 24,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#7d6753",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                fontSize: 34,
                color: "#3a3026",
              }}
            >
              hansolbangul.com
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 92,
              height: 92,
              border: "2px solid rgba(58, 48, 38, 0.12)",
              background: "rgba(255,255,255,0.72)",
              boxShadow: "12px 12px 0 rgba(58, 48, 38, 0.08)",
              fontSize: 28,
              color: "#b15f2b",
            }}
          >
            OG
          </div>
        </div>

        {thumbnail ? (
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              width: "100%",
              height: "100%",
              padding: "156px 56px 56px",
              gap: 28,
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                flex: "0 0 43%",
                overflow: "hidden",
                border: "2px solid rgba(58, 48, 38, 0.08)",
                boxShadow: "18px 18px 0 rgba(58, 48, 38, 0.08)",
                background: "#efe8dc",
              }}
            >
              <img
                src={thumbnail}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 164,
                  height: 8,
                  background: "#b15f2b",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  padding: "34px 36px",
                  background: "rgba(255,255,255,0.86)",
                  border: "2px solid rgba(58, 48, 38, 0.08)",
                  boxShadow: "18px 18px 0 rgba(58, 48, 38, 0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 60,
                    lineHeight: 1.18,
                    letterSpacing: "-0.03em",
                    wordBreak: "keep-all",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 28,
                    color: "#6f5d4e",
                  }}
                >
                  데굴데굴 블로그 · 프론트엔드 개발 아카이브
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "100%",
              padding: "156px 56px 56px",
              gap: 24,
            }}
          >
            <div
              style={{
                width: 164,
                height: 8,
                background: "#b15f2b",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                padding: "34px 36px",
                background: "rgba(255,255,255,0.84)",
                border: "2px solid rgba(58, 48, 38, 0.08)",
                boxShadow: "18px 18px 0 rgba(58, 48, 38, 0.08)",
              }}
            >
              <div
                style={{
                  fontSize: 70,
                  lineHeight: 1.18,
                  letterSpacing: "-0.03em",
                  wordBreak: "keep-all",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: 28,
                  color: "#6f5d4e",
                }}
              >
                데굴데굴 블로그 · 프론트엔드 개발 아카이브
              </div>
            </div>
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Jua",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
