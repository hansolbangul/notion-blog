import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import { DehydratedState } from "@tanstack/react-query";
import { ExtendedRecordMap } from "notion-types";
import { TPost, TPosts } from "@blog/notions/types";
import { getRecordMap } from "@blog/notions/apis";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import getCached from "@blog/notions/libs/react-query/getCached";
import pageQueryOptions from "@blog/notions/service/page/pageService";
import NotionInfoPage from "@app/(component)/notion/page/NotionInfoPage";

type Props = {
  params: {
    slug: string;
  };
};

type FetchType = {
  posts: TPosts;
  post: TPost;
  recordMap: ExtendedRecordMap;
  thumbnail: string;
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { post, thumbnail } = await getFetch(slug);
  return {
    title: post?.title,
    description: post?.summary || post?.title,
    openGraph: {
      title: post?.title,
      description: post?.summary || post?.title,
      images: [
        {
          url: thumbnail,
          alt: post?.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    keywords: post?.tags?.map((tag) => tag),
  };
}

async function getPreFetch(slug: string): Promise<DehydratedState> {
  const { queryKey: pageQueryKey } = pageQueryOptions.all();

  const { queryKey: pageDetailQueryKey } = pageQueryOptions.detail(slug);

  const { recordMap, post, posts } = await getFetch(slug);

  return await getDehydratedQueries([
    {
      queryKey: pageQueryKey,
      queryFn: () => posts,
    },
    {
      queryKey: pageDetailQueryKey,
      queryFn: () => ({
        ...post,
        recordMap,
      }),
    },
  ]);
}

async function getFetch(slug: string): Promise<FetchType> {
  const posts = await getCached({ type: "Library" });

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) throw new Error("Library not found");
  const recordMap = await getRecordMap(postDetail.id);

  return {
    posts,
    post: postDetail,
    recordMap,
    thumbnail: postDetail.thumbnail || "",
  };
}

export default async function PageContent({ params }: Props) {
  const dehydratedState = await getPreFetch(params.slug);
  return (
    <Hydrate state={dehydratedState}>
      <div className="mt-4">
        <NotionInfoPage />
      </div>
    </Hydrate>
  );
}
