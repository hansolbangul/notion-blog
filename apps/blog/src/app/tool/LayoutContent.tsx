"use client";

import React from "react";
import { useGetPosts } from "@blog/notions/service/post/usePostService";
import RecommendSwiper from "@app/(feature)/home/recommendSwiper";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: posts } = useGetPosts();

  return (
    <>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      {children}
    </>
  );
}
