"use client";

import React from "react";
import RecommendSwiper from "@app/(feature)/home/recommendSwiper";
import { TPosts } from "@blog/notions/types";

export default function LayoutContent({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: TPosts;
}) {
  return (
    <>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      {children}
    </>
  );
}
