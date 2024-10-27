import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import { getCachedPosts } from "@blog/notions/libs/react-query/getCachePosts";
import postQueryOptions from "@blog/notions/service/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";

export const revalidate = 600;

async function getFetch() {
  const posts = await getCachedPosts();
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
