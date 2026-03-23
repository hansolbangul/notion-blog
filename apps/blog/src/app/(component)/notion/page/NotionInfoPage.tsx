"use client";

import NotionTemplate from "@app/(component)/notion/page/NotionTemplate";
import { PostDetail } from "@blog/notions/types";

export default function NotionInfoPage({ post }: { post: PostDetail }) {
  return (
    <div className={"-mt-16"}>
      <NotionTemplate post={post} />
    </div>
  );
}
