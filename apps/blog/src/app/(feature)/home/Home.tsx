"use client";
import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { TPosts } from "@blog/notions/types";
import { useRouter, useSearchParams } from "next/navigation";

const date = (value: string) =>
  new Date(value).toLocaleDateString("en-CA").replaceAll("-", ".");
function Archive({ posts, tags }: { posts: TPosts; tags: string[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const active = params.get("tag") || "All";
  const counts = useMemo(
    () =>
      Object.fromEntries(
        tags.map((t) => [t, posts.filter((p) => p.tags?.includes(t)).length]),
      ),
    [posts, tags],
  );
  const popular = [...tags]
    .filter((t) => t !== "Recommend")
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 7);
  const filtered = posts.filter(
    (p) =>
      (active === "All" || p.tags?.includes(active)) &&
      `${p.title} ${p.summary || ""} ${p.tags?.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const total = Math.max(1, Math.ceil(filtered.length / 6));
  const page = Math.max(1, Math.min(total, Number(params.get("page")) || 1));
  const change = (tag: string, nextPage = 1) => {
    const p = new URLSearchParams();
    if (tag !== "All") p.set("tag", tag);
    if (nextPage > 1) p.set("page", String(nextPage));
    router.replace(`/?${p.toString()}#archive`, { scroll: false });
  };
  const [allTags, setAllTags] = useState(false);
  return (
    <section id="archive" className="archive-layout">
      <div className="archive-main">
        <div className="archive-heading">
          <h2>
            글 모음 <sup>{posts.length}</sup>
          </h2>
          <span className="eyebrow">THE ARCHIVE</span>
        </div>
        <div className="archive-controls">
          <label className="journal-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="6.5" />
              <path d="m15 15 5 5" />
            </svg>
            <input
              aria-label="글 검색"
              placeholder="어떤 이야기를 찾고 있나요?"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (page !== 1) change(active);
              }}
            />
            {query && (
              <button aria-label="검색 지우기" onClick={() => setQuery("")}>
                ×
              </button>
            )}
          </label>
          <span aria-live="polite">{filtered.length}개의 기록</span>
        </div>
        {active !== "All" && (
          <button className="active-filter" onClick={() => change("All")}>
            {active} <span>× 필터 해제</span>
          </button>
        )}
        <div className="story-list">
          {filtered.slice((page - 1) * 6, page * 6).map((post) => (
            <Link
              href={`/post/${post.slug}`}
              key={post.id}
              className="story-row"
            >
              <div className="story-copy">
                <div className="story-meta">
                  <span>
                    {post.tags?.find((t) => t !== "Recommend") || "DEVELOPMENT"}
                  </span>
                  <time>{date(post.date?.start_date || post.createdTime)}</time>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
              </div>
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt=""
                  className="story-thumb"
                  loading="lazy"
                />
              )}
              <span className="story-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
        {!filtered.length && (
          <div className="archive-empty">
            <h3>아직 찾지 못했어요.</h3>
            <p>다른 검색어를 입력하거나 주제 필터를 해제해 보세요.</p>
            <button
              onClick={() => {
                setQuery("");
                change("All");
              }}
            >
              전체 글 보기 ↗
            </button>
          </div>
        )}
        {total > 1 && (
          <nav className="journal-pagination" aria-label="글 목록 페이지네이션">
            <button
              disabled={page === 1}
              onClick={() => change(active, page - 1)}
            >
              ← 이전
            </button>
            <span>
              {String(page).padStart(2, "0")}{" "}
              <span>/ {String(total).padStart(2, "0")}</span>
            </span>
            <button
              disabled={page === total}
              onClick={() => change(active, page + 1)}
            >
              다음 →
            </button>
          </nav>
        )}
      </div>
      <aside className="journal-aside">
        <section>
          <div className="aside-title">
            <h2>주제별로 읽기</h2>
            <span>INDEX</span>
          </div>
          <button
            className={`topic-row ${active === "All" ? "selected" : ""}`}
            onClick={() => change("All")}
          >
            <span>전체 이야기</span>
            <span>{posts.length}</span>
          </button>
          {(allTags
            ? [...tags].sort((a, b) => counts[b] - counts[a])
            : popular
          ).map((t) => (
            <button
              key={t}
              className={`topic-row ${active === t ? "selected" : ""}`}
              onClick={() => change(t)}
            >
              <span>{t}</span>
              <span>{String(counts[t]).padStart(2, "0")}</span>
            </button>
          ))}
          <button
            className="more-topics"
            aria-expanded={allTags}
            onClick={() => setAllTags(!allTags)}
          >
            {allTags ? "주제 접기 −" : "모든 주제 보기 +"}
          </button>
        </section>
        <section id="about" className="author-note">
          <span className="eyebrow">BEHIND THE NOTES</span>
          <span className="author-monogram" aria-hidden="true">
            h.
          </span>
          <h2>안녕하세요, 지한솔입니다.</h2>
          <p>
            더 나은 개발 경험을 고민하는
            <br />
            프론트엔드 개발자입니다.
            <br />
            직접 부딪히며 배운 것들을 씁니다.
          </p>
          <a
            href="https://github.com/hansolbangul"
            target="_blank"
            rel="noreferrer"
          >
            만들고 있는 것들 ↗
          </a>
        </section>
      </aside>
    </section>
  );
}
export default function Home({
  posts,
  tags,
}: {
  posts: TPosts;
  tags: string[];
}) {
  const featured = posts[0];
  return (
    <div className="journal-home">
      <section className="journal-masthead">
        <div>
          <p className="eyebrow">CODE, CURIOSITY & THE IN-BETWEEN</p>
          <h1>
            데굴데굴<span>.</span>
          </h1>
        </div>
        <div className="masthead-note">
          <p>
            Learning,
            <br />
            one commit at a time.
          </p>
          <span>조금씩 더 나은 코드를 향해 굴러가는 기록.</span>
        </div>
      </section>
      <div className="edition-rule">
        <span>프론트엔드 개발 기록</span>
        <span>REACT · TYPESCRIPT · WEB</span>
        <span>BY HANSOL JI</span>
      </div>
      {featured && (
        <section className="lead-story">
          <Link href={`/post/${featured.slug}`} className="lead-copy">
            <div className="eyebrow">
              <span className="blue-dot" />
              LATEST ENTRY{" "}
              <span className="entry-number">
                / {String(posts.length).padStart(3, "0")}
              </span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <div className="lead-bottom">
              <time>
                {date(featured.date?.start_date || featured.createdTime)}
              </time>
              <span className="read-link">
                이야기 읽기 <b>↗</b>
              </span>
            </div>
          </Link>
          <Link
            href={`/post/${featured.slug}`}
            className="lead-visual"
            aria-label={featured.title}
          >
            {featured.thumbnail && (
              <img
                src={featured.thumbnail}
                alt={featured.title}
                fetchPriority="high"
              />
            )}
            <span className="image-caption">
              <span>ENGINEERING NOTES</span>
              <span>
                {featured.tags
                  ?.filter((t) => t !== "Recommend")
                  .slice(0, 2)
                  .join(" / ")
                  .toUpperCase()}
              </span>
            </span>
          </Link>
        </section>
      )}
      <Suspense fallback={<p>글 목록을 불러오는 중입니다.</p>}>
        <Archive posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
