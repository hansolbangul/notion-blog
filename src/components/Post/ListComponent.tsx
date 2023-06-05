import React from "react";
import Container from "../Elements/Container";
import { PostItem } from "./PostItem";
import Link from "next/link";
import { TPost, TPostType } from "@/src/types";

type Props = {
  post: TPost;
  type?: TPostType;
};

export default function ListComponent({ post, type = "Post" }: Props) {
  return (
    <Link href={`/${type.toLocaleLowerCase()}/${post.slug}`}>
      <Container.Col className="border-t py-8 md:py-16 border-gray-400">
        {post.thumbnail && <PostItem.Thumbnail thumbnail={post.thumbnail} />}
        <PostItem.Title title={post.title} />
        {post.summary && <PostItem.Summary summary={post.summary} />}
        {type === "Post" && (
          <div className="flex gap-1 flex-wrap">
            {post.tags?.map((tag) => (
              <PostItem.TagIcon key={tag} tag={tag} />
            ))}
          </div>
        )}
        <PostItem.Footer start_date={post.date.start_date} profile={post.author} />
      </Container.Col>
    </Link>
  );
}
