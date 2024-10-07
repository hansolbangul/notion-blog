import { getCachedPosts } from "@blog/notions/libs/react-query/getCachePosts";
import postQueryOptions from "@blog/notions/service/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import React from "react";
import LetterCountContent from "@app/(feature)/tool/letter-count/Content";

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
  };
}

export default async function Page() {
  const { dehydratedState } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <LetterCountContent />
    </Hydrate>
  );
}
