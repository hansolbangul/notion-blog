# Notion publishing and search

Publish an entry in the connected database with Status = Public, Type = Post (or Page / Library), a unique stable slug, title and a publication date at or before the current time (date-only values use Korean midnight, UTC+09:00). Fill summary with a natural description of the problem and result. Use headings and descriptive image captions in the article. Slug changes change URLs; preserve published slugs unless a redirect is added.

The shared public content cache and article body cache revalidate after 300 seconds. Local request coalescing lasts 10 seconds; article HTML, sitemap and RSS have a 60-second revalidation window. Revalidation is triggered by the next request and is stale-while-revalidate, not a scheduled five-minute job. Under regular traffic allow roughly 5–7 minutes; the first visit after inactivity can show cached content while it refreshes. Notion failures retain cached content and can delay updates. Republishing the application is not required. Search engine discovery/indexing is a separate process controlled by the engine and can take days or weeks.

Routes: /robots.txt, /sitemap.xml, /feed.xml. They use the same public content source; drafts and future publications are excluded. Sitemap lastmod and article dates use ISO 8601. Tool modification dates do not track unrelated blog edits. Archive pagination uses server-rendered links and self-canonical page URLs; filtered views are noindex, follow. blog.hansolbangul.com permanently redirects to hansolbangul.com, preserving paths and query strings.

Google Search Console already has the domain property sc-domain:hansolbangul.com. Submit https://hansolbangul.com/sitemap.xml once; the same endpoint updates automatically afterward. The old blog subdomain sitemap had 80 invalid-date errors in the September 5, 2026 report; fixed by ISO date serialization. Existing reports may take time to refresh.

Home Open Graph/Twitter image: /api/og?v=chibi-3, 1200×630. Uses the supplied laptop chibi artwork. Posts retain their Notion cover via /share-image/{type}/{slug}, falling back to the new mascot image. Social networks cache previews independently. Header/author icons and favicon use /api/og?kind=icon, a cached 96×96 PNG instead of the multi-megabyte embedded SVG.

Run `node scripts/check-seo.mjs http://localhost:3100` against the production build, or pass the production origin. This checks SSR article links and pagination, canonical URLs, JSON-LD, ISO sitemap dates, RSS, robots, missing article status and OG output. No ranking or indexing guarantee is implied.

## September 19 audit and improvements

- Search descriptions include the actual article title with the Notion summary, so reused coding-test summary templates no longer produce identical descriptions. Metadata, article JSON-LD and RSS share this rule. Pagination descriptions identify the page number.
- `/share-image/{type}/{slug}` resolves public image URLs directly and requests fresh signed URLs for native Notion attachments. The old Notion `/image` proxy was returning 403. Only published entries and allowed HTTPS image hosts are resolved. Legacy `/api/share-image` links forward to this resolver.
- Archive thumbnails use responsive Next Image output (80/120 CSS pixels), with their original files retained for social previews. Archive props omit unused author/status fields and long upstream image URLs. Article prefetch is disabled in the archive to avoid downloading multiple Notion articles before selection.
- Chibi display assets use transparent WebP; original PNGs remain for source/OG generation. Ads load after the page becomes idle rather than competing with the initial render. Mobile search uses 16px text and navigation/topic controls have at least 44px target height.
- Run `node scripts/check-seo.mjs https://hansolbangul.com --all` to crawl every sitemap URL for response status, unique metadata, self canonical, one H1 and article fields. It also checks filtered-page noindex and optimized homepage thumbnails. This is a regression check, not Google's validation or evidence of indexing.
- Google's Rich Results Test and Schema.org validation are separate from this script. Search Console access is required to check current excluded URLs, sitemap processing and field Core Web Vitals. A third-party audit score is not a Google ranking score.
