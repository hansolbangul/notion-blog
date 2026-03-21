"use client";
import NotionThumbnail from "./NotionItem/Thumbnail";
import { useParams } from "next/navigation";
import { useGetPostDetail } from "@blog/notions/service/post/usePostService";
import NotionTemplate from "@app/(component)/notion/page/NotionTemplate";
import PostProgressGuide from "./NotionItem/PostProgressGuide";

type NavigationPost = {
  slug: string;
  title: string;
} | null;

type Props = {
  prev: NavigationPost;
  next: NavigationPost;
};

export default function NotionPage({ prev, next }: Props) {
  const params = useParams();

  const { data: post } = useGetPostDetail(params.slug);

  return (
    <>
      <NotionTemplate post={post}>
        {post?.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
      </NotionTemplate>
      <PostProgressGuide prev={prev} next={next} />
    </>
  );
}
