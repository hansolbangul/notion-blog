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
  recordMap: ExtendedRecordMap | null;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
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
  } catch (error) {
    console.error("[post:getFetch] failed to fetch detail recordMap", {
      slug,
      pageId: postDetail.id,
      message: error instanceof Error ? error.message : String(error),
    });
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
    post: postDetail,
    recordMap,
  };
});

export default async function PostContent({ params }: Props) {
  const { slug } = await params;
  const { post, prev, next, recordMap } = await getFetch(slug);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: `/post/${post.slug}` },
  ]);

  if (!recordMap) {
    return (
      <div className="mt-4">
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={createPostJsonLd(post)} />
        <article className="border border-line bg-white px-6 py-10 shadow-[10px_10px_0_rgba(31,26,20,0.08)] sm:px-10">
          <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
            temporary issue
          </p>
          <h1 className="mt-3 font-display text-[32px] leading-tight text-ink sm:text-[40px]">
            {post.title}
          </h1>
          {post.summary ? (
            <p className="mt-4 max-w-3xl text-body16 leading-8 text-ink-soft">
              {post.summary}
            </p>
          ) : null}
          <p className="mt-8 text-body14 leading-7 text-ink-soft">
            본문 데이터를 잠시 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        </article>
      </div>
    );
  }

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
        prev={prev}
        next={next}
      />
    </div>
  );
}
