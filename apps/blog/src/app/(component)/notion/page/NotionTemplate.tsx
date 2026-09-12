"use client";
import { useState } from "react";
import NotionRender from "@components/Notion/NotionItem/NotionRender";
import Comment from "@components/Utteranc/Comment";
import type { PostDetail } from "@blog/notions/types";
export default function NotionTemplate({
  post,
}: {
  post?: PostDetail;
  children?: React.ReactNode;
}) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  if (!post) return null;
  return (
    <>
      <NotionRender post={post} blockMap={post.recordMap} />
      <details
        className="article-comments"
        onToggle={(event) => setCommentsOpen(event.currentTarget.open)}
      >
        <summary>댓글 열기</summary>
        {commentsOpen && <Comment post={post} />}
      </details>
    </>
  );
}
