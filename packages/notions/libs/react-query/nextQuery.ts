import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
  QueryKey,
} from "@tanstack/react-query";

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType> | unknown;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = new QueryClient();

  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn }),
    ),
  );

  return dehydrate(queryClient);
}

export const Hydrate = HydrationBoundary;

export default {};
