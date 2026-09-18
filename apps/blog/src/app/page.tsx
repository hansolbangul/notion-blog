import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import JsonLd from "@components/Seo/JsonLd";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";
import { redirect } from "next/navigation";
import getCached from "@blog/notions/libs/react-query/getCached";
import type { Metadata } from "next";
import { createHomeJsonLd, createHomeMetadata } from "@libs/seo";

export const revalidate = 60;

type Props = { searchParams: Promise<{ page?: string; tag?: string }> };
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const { posts } = await getFetch();
  const count = posts.filter(
    (post) => !params.tag || post.tags?.includes(params.tag),
  ).length;
  const page = Math.min(
    Math.max(1, Math.ceil(count / 6)),
    Math.max(1, Math.floor(Number(params.page)) || 1),
  );
  return createHomeMetadata(page, params.tag);
}

async function getFetch() {
  const posts = await getCached();
  return {
    posts,
    tags: Object.keys(getAllSelectItemsFromPosts("tags", posts)),
  };
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const { posts, tags } = await getFetch();
  const count = posts.filter(
    (post) => !params.tag || post.tags?.includes(params.tag),
  ).length;
  const page = Math.min(
    Math.max(1, Math.ceil(count / 6)),
    Math.max(1, Math.floor(Number(params.page)) || 1),
  );
  if (params.page && params.page !== String(page)) {
    const query = new URLSearchParams();
    if (page > 1) query.set("page", String(page));
    if (params.tag) query.set("tag", params.tag);
    redirect(`/${query.size ? `?${query}` : ""}`);
  }

  return (
    <Container.Col>
      <JsonLd data={createHomeJsonLd()} />
      <Home
        posts={posts.map(
          ({
            id,
            slug,
            title,
            summary,
            tags,
            thumbnail,
            date,
            createdTime,
          }) => ({
            id,
            slug,
            title,
            summary,
            tags,
            date,
            createdTime,
            thumbnail: thumbnail
              ? `/share-image/post/${encodeURIComponent(slug)}`
              : undefined,
          }),
        )}
        tags={tags}
        currentPage={page}
        activeTag={params.tag || "All"}
      />
    </Container.Col>
  );
}
