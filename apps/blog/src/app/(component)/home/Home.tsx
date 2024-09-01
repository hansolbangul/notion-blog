"use client";

import React from "react";
import RecommendSwiper from "@app/(component)/home/recommendSwiper";
import HomeSection from "@app/(component)/home/HomeSection";
import Container from "@/src/components/Elements/Container";
import { useGetPosts } from "@blog/notions/service/usePostService";
import { TPosts } from "@blog/notions/types";

interface Props {
  tags: string[];
}

export default function Home({ tags }: Props) {
  const { data } = useGetPosts();
  const posts = data as TPosts;

  return (
    <Container.Col>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <HomeSection posts={posts} tags={tags} />
    </Container.Col>
  );
}
