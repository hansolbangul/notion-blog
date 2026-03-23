"use client";
import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionTemplate from "@app/(component)/notion/page/NotionTemplate";
import PostProgressGuide from "./NotionItem/PostProgressGuide";
import { PostDetail } from "@blog/notions/types";

type NavigationPost = {
  slug: string;
  title: string;
} | null;

type Props = {
  post: PostDetail;
  prev: NavigationPost;
  next: NavigationPost;
};

export default function NotionPage({ post, prev, next }: Props) {
  return (
    <>
      <NotionTemplate post={post}>
        {post?.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
      </NotionTemplate>
      <PostProgressGuide prev={prev} next={next} />
    </>
  );
}
