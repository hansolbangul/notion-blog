import React from "react";
import Container from "../Elements/Container";
import { PostItem } from "./PostItem";
import { TPost } from "@/networks/network";

type Props = {
  post: TPost;
};

export default function PostComponent({ post }: Props) {
  return (
    <Container.Col className="border-t py-8 md:py-16 border-gray-400 dark:border-white">
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
