import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import NotionPage from "@/src/components/Notion/NotionPage";
import { DehydratedState } from "@tanstack/react-query";
import { ExtendedRecordMap } from "notion-types";
import { TPost, TPosts } from "@blog/notions/types";
import { filterPosts } from "@blog/notions/utils/notion";
import postQueryOptions from "@blog/notions/service/postService";
import { getRecordMap } from "@blog/notions/apis";
import { getCachedPosts } from "@blog/notions/libs/react-query/getCachePosts";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";

type Props = {
  params: {
    slug: string;
  };
};

type FetchType = {
  posts: TPosts;
  post: TPost;
  prev: string | null;
  next: string | null;
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

export async function generateStaticParams() {
  const posts = await getCachedPosts();
  const filteredPosts = filterPosts(posts);

  console.log(
    "filteredPosts",
    filteredPosts.map((filter) => filter.slug),
  );

  return filteredPosts.map((post) => ({
    slug: post.slug,
  }));
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

async function getFetch(slug: string): Promise<FetchType> {
  const posts = await getCachedPosts();

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) throw new Error("Post not found");
  const recordMap = await getRecordMap(postDetail.id);

  const postId = posts.findIndex((p: TPost) => p.slug === slug);
  const prev = postId === posts.length - 1 ? null : posts[postId + 1].slug;
  const next = postId === 0 ? null : posts[postId - 1].slug;

  return {
    prev,
    next,
    posts,
    post: postDetail,
    recordMap,
    thumbnail: postDetail.thumbnail || "",
  };
}

export default async function PostContent({ params }: Props) {
  const dehydratedState = await getPreFetch(params.slug);
  return (
    <Hydrate state={dehydratedState}>
      <div className="mt-4">
        <NotionPage />
      </div>
    </Hydrate>
  );
}
