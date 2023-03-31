import { Post } from "@/application/domain/post";
import React from "react";
import Container from "../Elements/Container";
import PostComponent from "../Post/PostComponent";

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <Container.Col>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Container.Col>
  );
}
