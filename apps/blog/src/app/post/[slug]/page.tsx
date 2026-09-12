import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import NotionPage from "@/src/components/Notion/NotionPage";
import JsonLd from "@components/Seo/JsonLd";
import { ExtendedRecordMap } from "notion-types";
import { PostDetail, TPost } from "@blog/notions/types";
import { getRecordMap } from "@blog/notions/apis";
import getCached from "@blog/notions/libs/react-query/getCached";
import {
  createBreadcrumbJsonLd,
  createPostJsonLd,
  createPostMetadata,
} from "@libs/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type FetchType = {
  post: TPost;
  prev: {
    slug: string;
    title: string;
  } | null;
  next: {
    slug: string;
    title: string;
  } | null;
  recommendations: { slug: string; title: string; tag?: string }[];
  recordMap: ExtendedRecordMap | null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getCached();
  const post = posts.find((t: TPost) => t.slug === slug);
  if (!post) notFound();
  return createPostMetadata(post);
}

const getFetch = cache(async (slug: string): Promise<FetchType> => {
  const posts = await getCached();

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) notFound();
  let recordMap: ExtendedRecordMap | null = null;

  try {
    recordMap = await getRecordMap(postDetail.id);
    if (!recordMap) throw new Error("Notion returned an empty article");
  } catch (error) {
    console.error("[post:getFetch] failed to fetch detail recordMap", {
      slug,
      pageId: postDetail.id,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

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
    recommendations: posts
      .filter(
        (candidate) =>
          candidate.slug !== slug && candidate.type?.includes("Post"),
      )
      .map((candidate) => ({
        candidate,
        score:
          candidate.tags?.filter(
            (tag) => tag !== "Recommend" && postDetail.tags?.includes(tag),
          ).length || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map(({ candidate }) => ({
        slug: candidate.slug,
        title: candidate.title,
        tag: candidate.tags?.find((tag) => tag !== "Recommend"),
      })),
    post: postDetail,
    recordMap,
  };
});

export default async function PostContent({ params }: Props) {
  const { slug } = await params;
  const { post, prev, next, recordMap, recommendations } = await getFetch(slug);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: `/post/${post.slug}` },
  ]);


  return (
    <div className="mt-4">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={createPostJsonLd(post)} />
      <NotionPage
        post={
          {
            ...post,
            recordMap,
          } as PostDetail
        }
        recommendations={recommendations}
        prev={prev}
        next={next}
      />
    </div>
  );
}
