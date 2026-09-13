"use client";
import Image from "next/image";

export type ComicPanel = { id: string; src: string; caption: string };

export default function ComicReader({ panels }: { panels: ComicPanel[] }) {
  return (
    <section className="comic-reader" aria-label="웹툰 연속 읽기">
      <div className="comic-track">
        {panels.map((panel, i) => (
          <figure className="comic-panel" key={panel.id}>
            {panel.src.startsWith("https://hansolbangul.com/instatoon/") ? (
              <Image
                src={new URL(panel.src).pathname}
                width={1254}
                height={1254}
                sizes="(max-width: 760px) 100vw, 760px"
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
          </figure>
        ))}
      </div>
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
