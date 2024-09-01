import React from "react";
import { PostItem } from "./PostItem";
import Link from "next/link";
import { TPost, TPostType } from "@blog/notions/types";

type Props = {
  post: TPost;
  type?: TPostType;
};

export default function ListComponent({ post, type = "Post" }: Props) {
  return (
    <Link href={`/${type.toLocaleLowerCase()}/${post.slug}`}>
      <div className="flex gap-4 py-8 border-gray-400">
        {post.thumbnail && <PostItem.Thumbnail thumbnail={post.thumbnail} />}
        <div className={"flex flex-col flex-1"}>
          <PostItem.Title title={post.title} />
          {post.summary && <PostItem.Summary summary={post.summary} />}
          <PostItem.Footer
            start_date={post.date.start_date}
            profile={post.author}
          />
        </div>
      </div>
    </Link>
  );
}
