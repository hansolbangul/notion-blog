"use client";
import NotionThumbnail from "./NotionItem/Thumbnail";
import { useParams } from "next/navigation";
import { useGetPostDetail } from "@blog/notions/service/post/usePostService";
import NotionTemplate from "@app/(component)/notion/page/NotionTemplate";

export default function NotionPage() {
  const params = useParams();

  const { data: post } = useGetPostDetail(params.slug);

  return (
    <NotionTemplate post={post}>
      {post?.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
    </NotionTemplate>
  );
}
