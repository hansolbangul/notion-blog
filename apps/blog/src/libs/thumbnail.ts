import "server-only";
import { NotionAPI } from "@blog/notions/apis/notion-client/client";
import type { TPost } from "@blog/notions/types";

// Resolve only thumbnail URLs belonging to a published post. Notion's old
// /image proxy now rejects these files; native uploads need a fresh signed URL.
export async function resolveThumbnail(
  post: TPost,
): Promise<string | undefined> {
  let source = post.thumbnail?.replace(/&amp;/g, "&");
  if (!source) return undefined;
  const proxy = new URL(source, "https://hansolbangul.com");
  if (
    proxy.hostname === "www.notion.so" &&
    proxy.pathname.startsWith("/image/")
  ) {
    source = decodeURIComponent(proxy.pathname.slice("/image/".length));
  }
  if (
    source.startsWith("attachment:") ||
    /(?:amazonaws\.com|notion-static\.com)\//.test(source)
  ) {
    const api = new NotionAPI();
    const result = await api.getSignedFileUrls([
      { permissionRecord: { table: "block", id: post.id }, url: source },
    ]);
    source = result.signedUrls?.[0];
    if (!source) return undefined;
  }
  const resolved = new URL(source, "https://hansolbangul.com");
  // Do not turn the image route into a proxy for arbitrary/private hosts.
  const allowed = [
    "hansolbangul.com",
    "notion.so",
    "notion.site",
    "notionusercontent.com",
    "amazonaws.com",
    "notion-static.com",
    "googleusercontent.com",
    "images.unsplash.com",
  ];
  if (
    resolved.protocol !== "https:" ||
    !allowed.some(
      (host) =>
        resolved.hostname === host || resolved.hostname.endsWith(`.${host}`),
    )
  )
    return undefined;
  return resolved.href;
}
