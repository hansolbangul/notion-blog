import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import postQueryOptions from "@blog/notions/service/post/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";
import getCached from "@blog/notions/libs/react-query/getCached";
import { Metadata } from "next";
import CONFIG from "@blog/notions/site.config";

export const revalidate = 600;

export const metadata = CONFIG.metadata;

async function getFetch() {
  const posts = await getCached();
  const { queryKey } = postQueryOptions.all();

  return {
    dehydratedState: await getDehydratedQueries([
      {
        queryKey,
        queryFn: () => posts,
      },
    ]),
    tags: Object.keys(getAllSelectItemsFromPosts("tags", posts)),
  };
}

export default async function Page() {
  const { dehydratedState, tags } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <Home tags={tags} />
      </Container.Col>
    </Hydrate>
  );
}
