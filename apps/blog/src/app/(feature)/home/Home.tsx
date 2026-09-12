"use client";
import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import Character from "@blog/ui/components/brand/Character";
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
  const page = Math.max(
    1,
    Math.min(total, Math.floor(Number(params.get("page"))) || 1),
  );
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
            기록 <sup>{posts.length}</sup>
          </h2>
          <span className="eyebrow">RECENT NOTES</span>
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
              placeholder="제목, 키워드로 찾아보기"
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
            <Character pose="back" />
            <h3>아직 없는 기록이네요.</h3>
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
        <section id="about" className="builder-note">
          <Character pose="side" />
          <div>
            <span className="eyebrow">THE BUILDER</span>
            <h2>지한솔</h2>
            <p>
              직접 만든 것과
              <br />
              만들면서 배운 것.
            </p>
            <a
              href="https://github.com/hansolbangul"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
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
  return (
    <div className="builder-home">
      <section className="builder-hero">
        <div className="builder-hero-copy">
          <p className="eyebrow">A DEVELOPER’S WORKBENCH</p>
          <h1>
            istp<span>.</span>builders
          </h1>
          <p className="hero-description">직접 만들고, 부딪히고, 기록합니다.</p>
          <div className="hero-topics">
            <span>Frontend</span>
            <span>DX</span>
            <span>Side projects</span>
          </div>
        </div>
        <div className="hero-character">
          <span className="tape-note">일단, 만들어보자.</span>
          <Character />
        </div>
      </section>
      <Suspense fallback={<p>기록을 불러오는 중입니다.</p>}>
        <Archive posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
