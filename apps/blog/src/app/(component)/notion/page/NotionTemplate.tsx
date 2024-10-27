"use client";

import NotionRender from "@components/Notion/NotionItem/NotionRender";
import Comment from "@components/Utteranc/Comment";
import { PostDetail } from "@blog/notions/types";

interface Props {
  post?: PostDetail;
  children?: React.ReactNode;
}

export default function NotionTemplate({ post, children }: Props) {
  if (!post) return null;
  return (
    <>
      <div className="-mt-4">
        {children}
        <NotionRender post={post} blockMap={post.recordMap} />
        <>
          <Comment post={post} />
        </>
      </div>
    </>
  );
}
