import Container from "../components/Elements/Container";
import Home from "@app/(feature)/home/Home";
import {
  getCachedPosts,
  getFreshPosts,
} from "@blog/notions/libs/react-query/getCachePosts";
import postQueryOptions from "@blog/notions/service/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import { getAllSelectItemsFromPosts } from "@blog/notions/utils/notion";
import React from "react";

export const revalidate = 300;

async function getFetch(isBuild: boolean) {
  // 빌드 시점에서는 캐시된 데이터를 사용하고, ISR 시점에서는 최신 데이터를 사용
  const posts = isBuild ? await getCachedPosts() : await getFreshPosts();
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
  const { dehydratedState, tags } = await getFetch(
    process.env.NODE_ENV === "production",
  );

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <Home tags={tags} />
      </Container.Col>
    </Hydrate>
  );
}
