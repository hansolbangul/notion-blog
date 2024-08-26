"use client";

import React, { useCallback, useState } from "react";
import { useGetPosts } from "@/src/service/usePostService";
import { TPosts } from "@/src/types";
import RecommendSwiper from "@app/(component)/home/recommendSwiper";
import HomeSection from "@app/(component)/home/HomeSection";
import Container from "@/src/components/Elements/Container";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data } = useGetPosts();

  const posts = data as TPosts;

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  }, []);

  return (
    <Container.Col>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <HomeSection search={search} posts={posts} />
    </Container.Col>
  );
}
