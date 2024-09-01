"use client";
import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionRender from "./NotionItem/NotionRender";
import Comment from "../Utteranc/Comment";
import { useParams } from "next/navigation";
import { useGetPostDetail } from "@blog/notions/service/usePostService";

export default function NotionPage() {
  const params = useParams();

  const { data: post } = useGetPostDetail(params.slug);

  if (!post) return null;
  return (
    <>
      <div className="-mt-4">
        {post.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
        <NotionRender post={post} blockMap={post.recordMap} />
        <>
          <Comment post={post} />
        </>
      </div>
    </>
  );
}
