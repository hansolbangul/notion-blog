"use client";

import RecommendSwiper from "@app/(feature)/home/recommendSwiper";
import React from "react";
import { useGetPosts } from "@blog/notions/service/usePostService";
import UuidSection from "@app/(feature)/tool/uuid/UuidSection";

export default function UuidContent() {
  const { data: posts } = useGetPosts();

  return (
    <>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <UuidSection />
    </>
  );
}
