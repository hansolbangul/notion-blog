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

type Props = {
  params: {
    slug: string;
  };
};

type FetchType = {
  posts: TPosts;
  post: TPost;
  recordMap: ExtendedRecordMap | null;
  thumbnail: string;
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const posts = await getCached({ type: "Library" });
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
  const posts = await getCached({ type: "Library" });

  const postDetail = posts.find((t: TPost) => t.slug === slug);
  if (!postDetail) notFound();
  let recordMap: ExtendedRecordMap | null = null;

  try {
    recordMap = await getRecordMap(postDetail.id);
  } catch (error) {
    console.error("[library:getFetch] failed to fetch detail recordMap", {
      slug,
      pageId: postDetail.id,
      message: error instanceof Error ? error.message : String(error),
    });
  }

  return {
    posts,
    post: postDetail,
    recordMap,
    thumbnail: postDetail.thumbnail || "",
  };
});

export default async function PageContent({ params }: Props) {
  const { post, recordMap } = await getFetch(params.slug);

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "홈", path: "/" },
    { name: post.title, path: `/library/${post.slug}` },
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

  const dehydratedState = await getPreFetch(params.slug);

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
