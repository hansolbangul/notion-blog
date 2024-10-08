import { getCachedPosts } from "@blog/notions/libs/react-query/getCachePosts";
import postQueryOptions from "@blog/notions/service/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import React from "react";
import LetterCountContent from "@app/tool/letter-count/Content";
import { Metadata } from "next";

async function getFetch() {
  const posts = await getCachedPosts();
  const { queryKey } = postQueryOptions.all();

  return {
    dehydratedState: await getDehydratedQueries([
      {
        queryKey,
        queryFn: () => posts,
      },
    ]),
  };
}

export const metadata = {
  title: "글자수 세기",
  description:
    "데굴데굴 블로그의 글자수 세기 도구로 쉽고 빠르게 텍스트의 글자수를 확인하세요.",
  openGraph: {
    title: "글자수 세기",
    description: "데굴데굴 블로그에서 제공하는 간편한 글자수 세기 도구",
    images: [
      {
        url: "/main_img.webp",
        alt: "지한솔방울썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["데굴데굴 블로그", "글자수 세기", "글자수"],
};

export default async function Page() {
  const { dehydratedState } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <LetterCountContent />
    </Hydrate>
  );
}
