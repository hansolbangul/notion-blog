import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
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
import JsonLd from "@components/Seo/JsonLd";
import {
  createBreadcrumbJsonLd,
  createPostJsonLd,
  createPostMetadata,
} from "@libs/seo";
import { isExcludedPageSlug } from "@libs/content";

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
  if (isExcludedPageSlug(slug)) notFound();

  const posts = await getCached({ type: "Page" });
  const post = posts.find((t: TPost) => t.slug === slug);
  if (!post) notFound();
  return createPostMetadata(post);
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

const getFetch = cache(async (slug: string): Promise<FetchType> => {
  if (isExcludedPageSlug(slug)) notFound();

  const posts = await getCached({ type: "Page" });

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) notFound();
  const recordMap = await getRecordMap(postDetail.id);

  return {
    posts,
    post: postDetail,
    recordMap,
    thumbnail: postDetail.thumbnail || "",
  };
});

export default async function PageContent({ params }: Props) {
  const { post } = await getFetch(params.slug);
  const dehydratedState = await getPreFetch(params.slug);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: `/page/${post.slug}` },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <div className="mt-4">
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={createPostJsonLd(post)} />
        <NotionInfoPage />
      </div>
    </Hydrate>
  );
}
