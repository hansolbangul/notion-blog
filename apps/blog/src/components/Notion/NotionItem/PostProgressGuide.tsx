"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavigationPost = {
  slug: string;
  title: string;
} | null;

type Props = {
  prev: NavigationPost;
  next: NavigationPost;
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export default function PostProgressGuide({ prev, next }: Props) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const articleElement = document.querySelector(".notion-page") as
        | HTMLElement
        | null;

      if (!articleElement) return;

      const articleTop =
        articleElement.getBoundingClientRect().top + window.scrollY;
      const articleHeight = articleElement.offsetHeight;
      const currentOffset = window.scrollY + window.innerHeight - articleTop;
      const nextProgress = Math.min(
        Math.max(currentOffset / Math.max(articleHeight, 1), 0),
        1,
      );

      setProgress(nextProgress);
      setVisible(nextProgress >= 0.74);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (!prev && !next) return null;

  return (
    <div
      className={`pointer-events-none fixed bottom-5 left-1/2 z-20 w-[min(820px,calc(100vw-1.5rem))] -translate-x-1/2 transition duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto border border-line bg-[rgba(252,248,241,0.96)] px-4 py-4 shadow-[10px_10px_0_rgba(31,26,20,0.1)] backdrop-blur">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
              continue reading
            </p>
            <p className="text-sm font-medium text-ink">
              글을 거의 다 읽으셨어요. 다음 흐름으로 이어서 볼까요?
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="shrink-0 border border-line px-3 py-2 text-[12px] uppercase tracking-editorial text-ink hover:border-accent"
          >
            맨 위로
          </button>
        </div>

        <div className="mb-4 h-1 w-full overflow-hidden bg-[rgba(31,26,20,0.08)]">
          <div
            className="h-full bg-accent transition-[width] duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/post/${prev.slug}`}
              className="border border-line px-4 py-4 hover:border-accent hover:bg-paper-strong"
            >
              <p className="mb-1 text-[11px] uppercase tracking-editorial text-ink-soft">
                이전 포스트
              </p>
              <p className="font-display text-[22px] leading-tight text-ink">
                {prev.title}
              </p>
            </Link>
          ) : (
            <button
              type="button"
              onClick={scrollToTop}
              className="border border-line px-4 py-4 text-left hover:border-accent hover:bg-paper-strong"
            >
              <p className="mb-1 text-[11px] uppercase tracking-editorial text-ink-soft">
                읽기 완료
              </p>
              <p className="font-display text-[22px] leading-tight text-ink">
                맨 위로 돌아가기
              </p>
            </button>
          )}

          {next ? (
            <Link
              href={`/post/${next.slug}`}
              className="border border-line px-4 py-4 hover:border-accent hover:bg-paper-strong"
            >
              <p className="mb-1 text-[11px] uppercase tracking-editorial text-ink-soft">
                다음 포스트
              </p>
              <p className="font-display text-[22px] leading-tight text-ink">
                {next.title}
              </p>
            </Link>
          ) : (
            <Link
              href="/"
              className="border border-line px-4 py-4 hover:border-accent hover:bg-paper-strong"
            >
              <p className="mb-1 text-[11px] uppercase tracking-editorial text-ink-soft">
                다음 동선
              </p>
              <p className="font-display text-[22px] leading-tight text-ink">
                다른 글 탐색하기
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
