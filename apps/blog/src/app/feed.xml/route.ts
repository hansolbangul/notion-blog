import {
  getAllPublishedContent,
  isIndexablePost,
  sortByRecent,
} from "@libs/content";
import {
  getPostUrl,
  getPublishedDate,
  getPostDescription,
  SEO_DEFAULTS,
} from "@libs/seo";

export const revalidate = 60;
const xml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );

export async function GET() {
  const { posts, libraries } = await getAllPublishedContent();
  const entries = sortByRecent(
    [...posts, ...libraries].filter(isIndexablePost),
  );
  const items = entries
    .map((post) => {
      const url = xml(getPostUrl(post));
      const published = getPublishedDate(post);
      return `<item><title>${xml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xml(getPostDescription(post))}</description>${published ? `<pubDate>${new Date(published).toUTCString()}</pubDate>` : ""}</item>`;
    })
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(SEO_DEFAULTS.siteName)}</title><link>${SEO_DEFAULTS.siteUrl}</link><description>${xml(SEO_DEFAULTS.defaultDescription)}</description><language>ko</language><atom:link href="${SEO_DEFAULTS.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    },
  );
}
