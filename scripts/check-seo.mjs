import assert from "node:assert/strict";
const base = process.argv[2] || "http://localhost:3100";
const read = async (path) => {
  const response = await fetch(`${base}${path}`, {
    headers: { "user-agent": "Googlebot" },
  });
  assert.equal(response.status, 200, path);
  return response.text();
};
const [home, second, sitemap, feed, robots] = await Promise.all(
  ["/", "/?page=2", "/sitemap.xml", "/feed.xml", "/robots.txt"].map(read),
);
for (const html of [home, second]) {
  assert.match(
    html,
    /class="story-row"/,
    "Article links must be server rendered",
  );
  assert.match(html, /application\/rss\+xml/);
  assert.match(html, /chibi-3/);
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/gs,
  ))
    JSON.parse(match[1]);
}
assert.match(
  second,
  /rel="canonical" href="https:\/\/hansolbangul.com\/\?page=2"/,
);
assert.match(home, /href="\/\?page=2#archive"/);
assert.match(robots, /Sitemap: https:\/\/hansolbangul.com\/sitemap.xml/);
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert.ok(urls.length > 70, "Published articles missing from sitemap");
assert.equal(urls.length, new Set(urls).size);
assert.ok(urls.every((url) => url.startsWith("https://hansolbangul.com/")));
assert.ok(!urls.some((url) => url.includes("/page/profile")));
for (const [, date] of sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) {
  assert.match(date, /^\d{4}-\d{2}-\d{2}T/);
  assert.ok(Number.isFinite(Date.parse(date)));
}
assert.ok((feed.match(/<item>/g) || []).length > 70);
const articleUrl = urls.find((url) => url.includes("/post/"));
const article = await read(new URL(articleUrl).pathname);
assert.match(article, /"@type":"BlogPosting"/);
assert.match(article, /"dateModified":"\d{4}-\d{2}-\d{2}T/);
assert.match(article, /<h1[ >]/);
const missing = await fetch(`${base}/post/seo-check-missing-post-20260913`, {
  headers: { "user-agent": "Googlebot" },
});
assert.equal(missing.status, 404);
const og = await fetch(`${base}/api/og?v=chibi-3`);
assert.equal(og.status, 200);
assert.match(og.headers.get("content-type"), /image\/png/);
const image = Buffer.from(await og.arrayBuffer());
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
const avatar = await fetch(`${base}/api/og?kind=icon`);
assert.equal(avatar.status, 200);
const avatarBytes = Buffer.from(await avatar.arrayBuffer());
assert.equal(avatarBytes.readUInt32BE(16), 96);
assert.equal(avatarBytes.readUInt32BE(20), 96);
assert.ok(avatarBytes.length < 100_000, "Avatar should be lightweight");
console.log(
  `SEO checks passed: ${urls.length} sitemap URLs, SSR pagination, article metadata, RSS, robots, 404, 1200×630 OG.`,
);
