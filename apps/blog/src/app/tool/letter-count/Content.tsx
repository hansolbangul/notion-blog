"use client";

import TitleSection from "@blog/ui/components/commons/TitleSection";
import Textarea from "@blog/ui/components/commons/Textarea";
import RecommendSwiper from "@app/(feature)/home/recommendSwiper";
import React from "react";
import { useGetPosts } from "@blog/notions/service/usePostService";
import CountSection from "@app/tool/letter-count/CountSection";
import { defaultValue } from "@app/(constant)/defaultBlogInfo";

export default function LetterCountContent() {
  const { data: posts } = useGetPosts();

  return (
    <>
      <RecommendSwiper
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <CountSection>
        <TitleSection title={"글자수 세기"}>
          <Textarea defaultValue={defaultValue} className={"w-full"} />
        </TitleSection>
      </CountSection>
    </>
  );
}
