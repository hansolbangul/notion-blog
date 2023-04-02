import { Post } from "@/application/domain/post";
import React from "react";
import Container from "../Elements/Container";
import PostComponent from "../Post/PostComponent";
import { TPosts } from "@/types";

type Props = {
  // posts: Post[];
  posts: TPosts;
};

export default function Home({ posts }: Props) {
  return (
    <Container.Col className="px-4">
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Container.Col>
  );
}
