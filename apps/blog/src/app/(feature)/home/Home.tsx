"use client";

import React from "react";
import RecommendSwiper from "@app/(feature)/home/recommendSwiper";
import HomeSection from "@app/(feature)/home/HomeSection";
import Container from "@/src/components/Elements/Container";
import { TPosts } from "@blog/notions/types";

interface Props {
  posts: TPosts;
  tags: string[];
}

export default function Home({ posts, tags }: Props) {
  return (
    <Container.Col>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <HomeSection posts={posts} tags={tags} />
    </Container.Col>
  );
}
