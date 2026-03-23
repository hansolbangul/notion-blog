import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import JsonLd from "@components/Seo/JsonLd";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";
import getCached from "@blog/notions/libs/react-query/getCached";
import type { Metadata } from "next";
import { createHomeJsonLd, createHomeMetadata } from "@libs/seo";

export const revalidate = 10800;

export const metadata: Metadata = createHomeMetadata();

async function getFetch() {
  try {
    const posts = await getCached();

    return {
      posts,
      tags: Object.keys(getAllSelectItemsFromPosts("tags", posts)),
    };
  } catch (error) {
    console.error("[home:getFetch] failed to load cached posts", {
      message: error instanceof Error ? error.message : String(error),
    });

    return {
      posts: [],
      tags: [],
    };
  }
}

export default async function Page() {
  const { posts, tags } = await getFetch();

  return (
    <Container.Col>
      <JsonLd data={createHomeJsonLd()} />
      <Home posts={posts} tags={tags} />
    </Container.Col>
  );
}
