import postQueryOptions from "@blog/notions/service/post/postService";
import {
  getDehydratedQueries,
  Hydrate,
} from "@blog/notions/libs/react-query/nextQuery";
import React from "react";
import LayoutContent from "@app/tool/LayoutContent";
import getCached from "@blog/notions/libs/react-query/getCached";

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
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dehydratedState } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <LayoutContent>{children}</LayoutContent>
    </Hydrate>
  );
}
