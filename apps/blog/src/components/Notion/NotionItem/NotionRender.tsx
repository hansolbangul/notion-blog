"use client";
import { useEffect, useMemo, useState, type ComponentProps } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import type { ExtendedRecordMap, PageBlock } from "notion-types";
import {
  getPageTableOfContents,
  getTextContent,
  getPageContentBlockIds,
} from "notion-utils";
import type { TPost } from "@blog/notions/types";
import { getEstimatedReadingMinutes } from "@libs/reading-time";
import Character from "@blog/ui/components/brand/Character";
import NotionHeader from "./NotionHeader";
import CodeBlock from "./CodeBlock";
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  { ssr: false },
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false },
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);

// Post metadata belongs to the article header; keep nested databases available.
function ArticleCollection(props: ComponentProps<typeof Collection>) {
  if (props.block.type === "page") return null;
  return <Collection {...props} />;
}

export default function NotionRender({
  blockMap,
  post,
}: {
  blockMap: ExtendedRecordMap;
  post: TPost;
}) {
  const root =
    blockMap.block[post.id]?.value || Object.values(blockMap.block)[0]?.value;
  const toc = useMemo(
    () => (root ? getPageTableOfContents(root as PageBlock, blockMap) : []),
    [root, blockMap],
  );
  const minutes = useMemo(
    () =>
      getEstimatedReadingMinutes(
        getPageContentBlockIds(blockMap)
          .map((id) =>
            getTextContent(blockMap.block[id]?.value?.properties?.title || []),
          )
          .join(" "),
      ),
    [blockMap],
  );
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const body = document.querySelector(".article-body");
        if (!body) return;
        const rect = body.getBoundingClientRect();
        setProgress(
          Math.max(
            0,
            Math.min(
              100,
              ((-rect.top + 110) /
                Math.max(1, rect.height - window.innerHeight + 110)) *
                100,
            ),
          ),
        );
        let current = "";
        for (const item of toc) {
          const el = document.getElementById(item.id.replace(/-/g, ""));
          if (el && el.getBoundingClientRect().top < 160) current = item.id;
        }
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, [toc]);
  const contents = (
    <nav aria-label="글 목차">
      {toc.map((item) => (
        <a
          className={active === item.id ? "active" : ""}
          style={{ paddingLeft: `${Math.min(item.indentLevel, 2) * 10}px` }}
          key={item.id}
          href={`#${item.id.replace(/-/g, "")}`}
          aria-current={active === item.id ? "location" : undefined}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
  return (
    <div className="article-layout">
      <div
        className="article-progress"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />
      <div className="article-primary">
        <NotionHeader post={post} minutes={minutes} />
        {toc.length > 0 && (
          <details className="mobile-toc">
            <summary>
              이 글의 목차 <span>＋</span>
            </summary>
            {contents}
          </details>
        )}
        <div className="article-body">
          <NotionRenderer
            recordMap={blockMap}
            fullPage={false}
            darkMode={false}
            disableHeader
            showCollectionViewDropdown={false}
            mapPageUrl={(id) => `https://www.notion.so/${id.replace(/-/g, "")}`}
            components={{
              Code: CodeBlock,
              Modal,
              Pdf,
              Collection: ArticleCollection,
            }}
          />
        </div>
        <div className="article-end">
          <Character pose="excited" />
          <div>
            <span className="eyebrow">END OF NOTE</span>
            <p>읽었으면, 이제 만들어볼 차례.</p>
            <a href="/#archive">다른 기록 보기 ↗</a>
          </div>
        </div>
      </div>
      <aside className="article-toc">
        <div className="toc-sticky">
          {toc.length > 0 && (
            <>
              <div className="toc-title">
                이 글의 목차 <span>{Math.round(progress)}%</span>
              </div>
              {contents}
            </>
          )}
          <div className="toc-character">
            <Character pose="thinking" />
            <span>천천히 읽어도 됩니다.</span>
          </div>
          <a className="back-top" href="#">
            맨 위로 ↑
          </a>
        </div>
      </aside>
    </div>
  );
}
