import React from "react";
import { PostItem } from "./PostItem";
import Link from "next/link";
import { TPost, TPostType } from "@blog/notions/types";
import { getPostReadingMinutes } from "@libs/reading-time";

type Props = {
  post: TPost;
  type?: TPostType;
};

export default function ListComponent({ post, type = "Post" }: Props) {
  const readingMinutes = getPostReadingMinutes(post);

  return (
    <Link
      href={`/${type.toLocaleLowerCase()}/${post.slug}`}
      className="group block"
    >
      <article className="grid gap-4 border-b border-line py-8 transition duration-200 hover:translate-y-[-2px] md:grid-cols-[148px_minmax(0,1fr)] md:gap-6">
        {post.thumbnail && <PostItem.Thumbnail thumbnail={post.thumbnail} />}
        <div className="flex flex-1 flex-col justify-between">
          <PostItem.Title title={post.title} />
          {post.summary && <PostItem.Summary summary={post.summary} />}
          <PostItem.Footer
            start_date={post.date.start_date}
            readingMinutes={readingMinutes}
            profile={post.author}
          />
        </div>
      </article>
    </Link>
  );
}
