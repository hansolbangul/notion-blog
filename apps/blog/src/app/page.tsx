import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import JsonLd from "@components/Seo/JsonLd";
import postQueryOptions from "@blog/notions/service/post/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";
import getCached from "@blog/notions/libs/react-query/getCached";
import { NOTION_REVALIDATE_SECONDS } from "@blog/notions/constants";
import type { Metadata } from "next";
import { createHomeJsonLd, createHomeMetadata } from "@libs/seo";

export const revalidate = NOTION_REVALIDATE_SECONDS;

export const metadata: Metadata = createHomeMetadata();

async function getFetch() {
  const { queryKey } = postQueryOptions.all();

  try {
    const posts = await getCached();

    return {
      dehydratedState: await getDehydratedQueries([
        {
          queryKey,
          queryFn: () => posts,
        },
      ]),
      tags: Object.keys(getAllSelectItemsFromPosts("tags", posts)),
    };
  } catch (error) {
    console.error("[home:getFetch] failed to load cached posts", {
      message: error instanceof Error ? error.message : String(error),
    });

    return {
      dehydratedState: await getDehydratedQueries([
        {
          queryKey,
          queryFn: () => [],
        },
      ]),
      tags: [],
    };
  }
}

export default async function Page() {
  const { dehydratedState, tags } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <JsonLd data={createHomeJsonLd()} />
        <Home tags={tags} />
      </Container.Col>
    </Hydrate>
  );
}
