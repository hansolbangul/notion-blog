# Notion publishing and search

Publish an entry in the connected database with Status = Public, Type = Post (or Page / Library), a unique stable slug, title and a publication date at or before the current time (date-only values use Korean midnight, UTC+09:00). Fill summary with a natural description of the problem and result. Use headings and descriptive image captions in the article. Slug changes change URLs; preserve published slugs unless a redirect is added.

The shared public content cache and article body cache revalidate after 300 seconds. Local request coalescing lasts 10 seconds; article HTML, sitemap and RSS have a 60-second revalidation window. Revalidation is triggered by the next request and is stale-while-revalidate, not a scheduled five-minute job. Under regular traffic allow roughly 5–7 minutes; the first visit after inactivity can show cached content while it refreshes. Notion failures retain cached content and can delay updates. Republishing the application is not required. Search engine discovery/indexing is a separate process controlled by the engine and can take days or weeks.

Routes: /robots.txt, /sitemap.xml, /feed.xml. They use the same public content source; drafts and future publications are excluded. Sitemap lastmod and article dates use ISO 8601. Tool modification dates do not track unrelated blog edits. Archive pagination uses server-rendered links and self-canonical page URLs; filtered views are noindex, follow. blog.hansolbangul.com permanently redirects to hansolbangul.com, preserving paths and query strings.

Google Search Console already has the domain property sc-domain:hansolbangul.com. Submit https://hansolbangul.com/sitemap.xml once; the same endpoint updates automatically afterward. The old blog subdomain sitemap had 80 invalid-date errors in the September 5, 2026 report; fixed by ISO date serialization. Existing reports may take time to refresh.

Home Open Graph/Twitter image: /api/og?v=chibi-3, 1200×630. Uses the supplied laptop chibi artwork. Posts retain their Notion cover via /share-image/{type}/{slug}, falling back to the new mascot image. Social networks cache previews independently. Header/author icons and favicon use /api/og?kind=icon, a cached 96×96 PNG instead of the multi-megabyte embedded SVG.

Run `node scripts/check-seo.mjs http://localhost:3100` against the production build, or pass the production origin. This checks SSR article links and pagination, canonical URLs, JSON-LD, ISO sitemap dates, RSS, robots, missing article status and OG output. No ranking or indexing guarantee is implied.
