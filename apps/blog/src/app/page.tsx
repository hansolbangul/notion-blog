import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import postQueryOptions from "@blog/notions/service/post/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";
import getCached from "@blog/notions/libs/react-query/getCached";
import { Metadata } from "next";
import CONFIG from "@blog/notions/site.config";

export const revalidate = 600;

export const metadata = {
  title: "데굴데굴 포스팅 | hansolbangul",
  description:
    "데굴데굴 블로그는 다양한 개발 로그와 프론트엔드 관련 정보를 공유하는 공간입니다. JavaScript, React, CSS 등 최신 웹 기술과 관련된 심도 있는 분석과 실습 가이드를 제공합니다. 프론트엔드 개발자로서의 여정과 경험을 담아내며, 유용한 팁과 트릭을 통해 개발자들의 성장을 도모합니다. 또한, 프로젝트 관리와 효율적인 협업 방법에 대한 인사이트도 다루고 있습니다. 많은 관심 부탁드립니다.",
  keywords: "블로그, 개발, 로고, 프론트엔드, 웹 개발, React, JavaScript",
  openGraph: {
    title: "데굴데굴 블로그",
    description:
      "데굴데굴 블로그는 다양한 개발 로고와 프론트엔드 관련 정보를 공유하는 공간입니다.",
    url: "https://blog.hansolbangul.com",
    type: "website",
    images: [
      {
        url: "https://blog.hansolbangul.com/main_img.webp",
        alt: "지한솔방울썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
};

async function getFetch() {
  const posts = await getCached();
  const { queryKey } = postQueryOptions.all();

  return {
    dehydratedState: await getDehydratedQueries([
      {
        queryKey,
        queryFn: () => posts,
      },
    ]),
    tags: Object.keys(getAllSelectItemsFromPosts("tags", posts)),
  };
}

export default async function Page() {
  const { dehydratedState, tags } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <Home tags={tags} />
      </Container.Col>
    </Hydrate>
  );
}
