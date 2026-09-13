"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ComicPanel = { id: string; src: string; caption: string };

export default function ComicReader({ panels }: { panels: ComicPanel[] }) {
  const [mode, setMode] = useState<"vertical" | "slides">("vertical");
  const [current, setCurrent] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el || mode !== "slides") return;
    el.scrollLeft = 0;
    const update = () =>
      setCurrent(
        Math.max(
          0,
          Math.min(
            panels.length - 1,
            Math.round(el.scrollLeft / el.clientWidth),
          ),
        ),
      );
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [mode, panels.length]);
  function go(index: number) {
    const el = track.current;
    if (!el) return;
    el.scrollTo({
      left: Math.max(0, Math.min(panels.length - 1, index)) * el.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }
  return (
    <section
      className={`comic-reader comic-reader--${mode}`}
      aria-label="인스타툰 읽기"
    >
      <div className="comic-toolbar">
        <span className="comic-label">
          작은 이야기 <span>· {panels.length}컷</span>
        </span>
        <div className="comic-modes" role="group" aria-label="읽기 방식">
          <button
            type="button"
            aria-pressed={mode === "vertical"}
            onClick={() => {
              setMode("vertical");
              setCurrent(0);
            }}
          >
            쭉 읽기
          </button>
          <button
            type="button"
            aria-pressed={mode === "slides"}
            onClick={() => {
              if (mode !== "slides") {
                setMode("slides");
                setCurrent(0);
              }
            }}
          >
            한 컷씩
          </button>
        </div>
      </div>
      <div
        className="comic-track"
        ref={track}
        tabIndex={mode === "slides" ? 0 : undefined}
        aria-label={
          mode === "slides" ? "좌우로 넘기거나 방향키로 읽기" : undefined
        }
        onKeyDown={(e) => {
          if (mode !== "slides" || e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            go(current + (e.key === "ArrowRight" ? 1 : -1));
          }
          if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            go(e.key === "Home" ? 0 : panels.length - 1);
          }
        }}
      >
        {panels.map((panel, i) => (
          <figure className="comic-panel" key={panel.id}>
            {panel.src.startsWith("https://hansolbangul.com/instatoon/") ? (
              <Image
                src={new URL(panel.src).pathname}
                width={1254}
                height={1254}
                sizes="(max-width: 720px) calc(100vw - 40px), 680px"
                alt={panel.caption || `인스타툰 ${i + 1}번째 컷`}
                priority={i === 0}
              />
            ) : (
              <img
                src={panel.src}
                alt={panel.caption || `인스타툰 ${i + 1}번째 컷`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
            <figcaption>
              {String(i + 1).padStart(2, "0")}{" "}
              <span>/ {String(panels.length).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {mode === "slides" && (
        <div className="comic-navigation">
          <button
            type="button"
            disabled={current === 0}
            onClick={() => go(current - 1)}
            aria-label="이전 컷"
          >
            ← 이전
          </button>
          <span aria-live="polite" aria-atomic="true">
            {current + 1} / {panels.length}
          </span>
          <button
            type="button"
            disabled={current === panels.length - 1}
            onClick={() => go(current + 1)}
            aria-label="다음 컷"
          >
            다음 →
          </button>
        </div>
      )}
      {panels.some((p) => p.caption) && (
        <details className="comic-transcript">
          <summary>그림 속 이야기, 글로 읽기</summary>
          {panels.map(
            (p, i) =>
              p.caption && (
                <p key={p.id}>
                  <strong>{i + 1}컷.</strong> {p.caption}
                </p>
              ),
          )}
        </details>
      )}
    </section>
  );
}
