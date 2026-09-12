import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ExtendedRecordMap } from "notion-types";
import { PostDetail, TPost } from "@blog/notions/types";
import { getRecordMap } from "@blog/notions/apis";
import getCached from "@blog/notions/libs/react-query/getCached";
import NotionInfoPage from "@app/(component)/notion/page/NotionInfoPage";
import JsonLd from "@components/Seo/JsonLd";
import {
  createBreadcrumbJsonLd,
  createPostJsonLd,
  createPostMetadata,
} from "@libs/seo";
import { isExcludedPageSlug } from "@libs/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type FetchType = {
  post: TPost;
  recordMap: ExtendedRecordMap | null;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  if (isExcludedPageSlug(slug)) notFound();

  const posts = await getCached({ type: "Page" });
  const post = posts.find((t: TPost) => t.slug === slug);
  if (!post) notFound();
  return createPostMetadata(post);
}

const getFetch = cache(async (slug: string): Promise<FetchType> => {
  if (isExcludedPageSlug(slug)) notFound();

  const posts = await getCached({ type: "Page" });

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) notFound();
  let recordMap: ExtendedRecordMap | null = null;

  try {
    recordMap = await getRecordMap(postDetail.id);
    if (!recordMap) throw new Error("Notion returned an empty article");
  } catch (error) {
    console.error("[page:getFetch] failed to fetch detail recordMap", {
      slug,
      pageId: postDetail.id,
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  return {
    post: postDetail,
    recordMap,
  };
});

export default async function PageContent({ params }: Props) {
  const { slug } = await params;
  const { post, recordMap } = await getFetch(slug);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: `/page/${post.slug}` },
  ]);


  return (
    <div className="mt-4">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={createPostJsonLd(post)} />
      <NotionInfoPage
        post={
          {
            ...post,
            recordMap,
          } as PostDetail
        }
      />
    </div>
  );
}
