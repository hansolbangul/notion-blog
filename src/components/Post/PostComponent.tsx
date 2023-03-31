import { Post } from "@/application/domain/post";
import Image from "next/image";
import React from "react";
import Container from "../Elements/Container";

type Props = {
  post: Post;
};

export default function PostComponent({ post }: Props) {
  return (
    <Container.Col>
      {post.thumbnail && (
        <div className="w-full h-96 relative">
          <Image placeholder="blur" blurDataURL="/icons/img_loading.svg" style={{ objectFit: "cover" }} fill src={post.thumbnail} alt="thumbnail" />
        </div>
      )}
      <div>{post.thumbnail}</div>
      <div>{post.title}</div>
      <div>{post.summary}</div>
      <div>{post.tags}</div>
      <div>{post.date.start_date}</div>
    </Container.Col>
  );
}
