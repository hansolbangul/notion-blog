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
    <Link
      className="h-full place-items-stretch"
      href={`/${type.toLocaleLowerCase()}/${post.slug}`}
    >
      <Container.Flex className="h-full rounded-lg py-2 my-2 px-2 md:py-8 md:px-4 border-gray-400 space-x-4 items-center shadow-lg relative hover:-translate-y-2 transition-transform">
        {post.thumbnail && <PostItem.Thumbnail thumbnail={post.thumbnail} />}
        <div className="flex flex-col flex-1">
          <PostItem.Title title={post.title} />
          {post.summary && <PostItem.Summary summary={post.summary} />}
          {type === "Post" && (
            <div className="flex gap-1 flex-wrap">
              {post.tags?.map((tag) => (
                <PostItem.TagIcon key={tag} tag={tag} />
              ))}
            </div>
          )}
          <PostItem.Footer
            start_date={post.date.start_date}
            profile={post.author}
          />
        </div>
      </Container.Flex>
    </Link>
  );
}
