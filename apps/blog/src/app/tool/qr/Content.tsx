"use client";

import RecommendSwiper from "@app/(feature)/home/recommendSwiper";
import React from "react";
import { useGetPosts } from "@blog/notions/service/usePostService";
import QrSection from "@app/tool/qr/QrSection";

export default function QrContent() {
  const { data: posts } = useGetPosts();

  return (
    <>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <QrSection />
    </>
  );
}
