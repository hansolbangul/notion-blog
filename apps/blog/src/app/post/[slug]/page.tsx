import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import NotionPage from "@/src/components/Notion/NotionPage";
import JsonLd from "@components/Seo/JsonLd";
import { DehydratedState } from "@tanstack/react-query";
import { ExtendedRecordMap } from "notion-types";
import { TPost, TPosts } from "@blog/notions/types";
import postQueryOptions from "@blog/notions/service/post/postService";
import { getRecordMap } from "@blog/notions/apis";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import getCached from "@blog/notions/libs/react-query/getCached";
import {
  createBreadcrumbJsonLd,
  createPostJsonLd,
  createPostMetadata,
} from "@libs/seo";

type Props = {
  params: {
    slug: string;
  };
};

type FetchType = {
  posts: TPosts;
  post: TPost;
  prev: {
    slug: string;
    title: string;
  } | null;
  next: {
    slug: string;
    title: string;
  } | null;
  recordMap: ExtendedRecordMap;
  thumbnail: string;
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { post } = await getFetch(slug);
  return createPostMetadata(post);
}

async function getPreFetch(slug: string): Promise<DehydratedState> {
  const { queryKey: postQueryKey } = postQueryOptions.all();

  const { queryKey: postDetailQueryKey } = postQueryOptions.detail(slug);

  const { recordMap, post, posts } = await getFetch(slug);

  return await getDehydratedQueries([
    {
      queryKey: postQueryKey,
      queryFn: () => posts,
    },
    {
      queryKey: postDetailQueryKey,
      queryFn: () => ({
        ...post,
        recordMap,
      }),
    },
  ]);
}

const getFetch = cache(async (slug: string): Promise<FetchType> => {
  const posts = await getCached();

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) notFound();
  const recordMap = await getRecordMap(postDetail.id);

  const postId = posts.findIndex((p: TPost) => p.slug === slug);
  const prevPost = postId === posts.length - 1 ? null : posts[postId + 1];
  const nextPost = postId === 0 ? null : posts[postId - 1];

  return {
    prev: prevPost
      ? {
          slug: prevPost.slug,
          title: prevPost.title,
        }
      : null,
    next: nextPost
      ? {
          slug: nextPost.slug,
          title: nextPost.title,
        }
      : null,
    posts,
    post: postDetail,
    recordMap,
    thumbnail: postDetail.thumbnail || "",
  };
});

export default async function PostContent({ params }: Props) {
  const { post, prev, next } = await getFetch(params.slug);
  const dehydratedState = await getPreFetch(params.slug);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: `/post/${post.slug}` },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <div className="mt-4">
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={createPostJsonLd(post)} />
        <NotionPage prev={prev} next={next} />
      </div>
    </Hydrate>
  );
}
