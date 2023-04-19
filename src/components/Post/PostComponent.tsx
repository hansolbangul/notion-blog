import React from "react";
import Container from "../Elements/Container";
import { PostItem } from "./PostItem";
import { TPost } from "@/networks/network";
import Link from "next/link";

type Props = {
  post: TPost;
};

export default function PostComponent({ post }: Props) {
  return (
    <Link href={`/post/${post.slug}`}>
      <Container.Col className="border-t py-8 md:py-16 border-gray-400 dark:border-white">
        {post.thumbnail && <PostItem.Thumbnail thumbnail={post.thumbnail} />}
        <PostItem.Title title={post.title} />
        {post.summary && <PostItem.Summary summary={post.summary} />}
        <div className="flex gap-1 flex-wrap">
          {post.tags?.map((tag) => (
            <PostItem.TagIcon key={tag} tag={tag} />
          ))}
        </div>
        <PostItem.Footer start_date={post.date.start_date} profile={post.author} />
      </Container.Col>
    </Link>
  );
}
