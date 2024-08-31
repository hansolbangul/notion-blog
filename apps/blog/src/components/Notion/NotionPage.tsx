"use client";
import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionRender from "./NotionItem/NotionRender";
import { BlockMap, ExtendedRecordMap } from "notion-types";
import { TPost } from "@/src/types";
import Comment from "../Utteranc/Comment";
import usePostQuery from "@hook/usePostQuery";
import { useGetPostDetail } from "@/src/service/usePostService";
import { useParams } from "next/navigation";

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
