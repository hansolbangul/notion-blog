"use client";

import Link from "next/link";
import Character from "@blog/ui/components/brand/Character";
import { useEffect, useState } from "react";

export type RecommendedPost = { slug: string; title: string; tag?: string };

export default function ReadingRecommendation({
  posts,
}: {
  posts: RecommendedPost[];
}) {
  const [nearEnd, setNearEnd] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed || !posts.length) return;
    const article = document.querySelector(".article-body");
    if (!article) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = article.getBoundingClientRect();
        const distance = Math.max(1, bounds.height - window.innerHeight + 110);
        setNearEnd(
          window.scrollY > 120 && (-bounds.top + 110) / distance >= 0.85,
        );
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(article);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [dismissed, posts.length]);

  const visible = nearEnd && !dismissed && posts.length > 0;
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDismissed(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  if (!visible) return null;

  return (
    <aside className="reading-recommendation" aria-label="이어서 읽을 글 추천">
      <Character pose="crouching" className="recommendation-mascot" />
      <div className="recommendation-bubble">
        <button
          className="recommendation-close"
          type="button"
          aria-label="추천 글 닫기"
          onClick={() => setDismissed(true)}
        >
          ×
        </button>
        <p className="recommendation-request">이것도 읽어주면 안돼요?</p>
        <span className="recommendation-label">이어서 읽기</span>
        <div className="recommendation-links">
          {posts.map((post) => (
            <Link key={post.slug} href={`/post/${post.slug}`}>
              <span>{post.tag || "기록"}</span>
              <strong>{post.title}</strong>
              <span className="recommendation-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
