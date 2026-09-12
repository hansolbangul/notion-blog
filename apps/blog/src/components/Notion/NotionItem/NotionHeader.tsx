"use client";
import { useState } from "react";
import type { TPost } from "@blog/notions/types";
import Link from "next/link";
export default function NotionHeader({
  post,
  minutes,
}: {
  post: TPost;
  minutes?: number;
}) {
  const [message, setMessage] = useState("");
  return (
    <header className="article-header">
      <Link className="article-back" href="/#archive">
        ← 모든 기록
      </Link>
      <div className="article-tags">
        {post.tags
          ?.filter((t) => t !== "Recommend")
          .slice(0, 3)
          .map((t) => (
            <Link href={`/?tag=${encodeURIComponent(t)}#archive`} key={t}>
              {t}
            </Link>
          ))}
      </div>
      <h1>{post.title}</h1>
      {post.summary && <p className="article-deck">{post.summary}</p>}
      <div className="article-byline">
        <img src="/brand/icon.png" alt="" width="32" height="32" />
        <span>지한솔</span>
        <span className="byline-separator">/</span>
        <time dateTime={post.date?.start_date || post.createdTime}>
          {(post.date?.start_date || post.createdTime)
            .slice(0, 10)
            .replaceAll("-", ".")}
        </time>
        {minutes && (
          <>
            <span className="byline-separator">/</span>
            <span>{minutes}분 읽기</span>
          </>
        )}
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              setMessage("링크 복사됨 ✓");
            } catch {
              setMessage("주소창의 링크를 복사해 주세요.");
            }
          }}
          aria-label="현재 글 주소 복사"
        >
          링크 복사 ↗
        </button>
        <span role="status" className="copy-status">
          {message}
        </span>
      </div>
    </header>
  );
}
