import { HydrationBoundary, dehydrate, QueryKey } from "@tanstack/react-query";
import queryClient from "./queryClient";

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType> | unknown;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn }),
    ),
  );

  return dehydrate(queryClient); // queries 대신 state 전체를 반환
}

export const Hydrate = HydrationBoundary;

export default {};
