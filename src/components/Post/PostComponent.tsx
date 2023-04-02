import { Post } from "@/application/domain/post";
import React from "react";
import Container from "../Elements/Container";
import { PostItem } from "./PostItem";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostComponent({ post }: Props) {
  return (
    <Container.Col className="border-t py-8 md:py-16 border-gray-400 dark:border-white first:border-t-0">
      {post.thumbnail && <PostItem.Thumbnail slug={post.slug} thumbnail={post.thumbnail} />}
      <PostItem.Title slug={post.slug} title={post.title} />
      {post.summary && <PostItem.Summary summary={post.summary} />}
      <div className="flex gap-1 flex-wrap">
        {post.tags?.map((tag) => (
          <PostItem.TagIcon key={tag} tag={tag} />
        ))}
      </div>
      <PostItem.Footer start_date={post.date.start_date} profile={post.author} />
    </Container.Col>
  );
}
