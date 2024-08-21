import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  QueryState,
  QueryKey,
} from "@tanstack/react-query";
import getQueryClient from "@/src/app/queryClient";

function isEqual(value1: any, value2: any) {
  if (value1 === value2) {
    return true;
  }

  if (
    typeof value1 !== "object" ||
    typeof value2 !== "object" ||
    value1 === null ||
    value2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !isEqual(value1[key], value2[key])) {
      return false;
    }
  }

  return true;
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType> | unknown;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter((query) =>
    isEqual(query.queryKey, queryKey),
  );

  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q["queryFn"]>>
  >;
}

export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn }),
    ),
  );

  return dehydrate(queryClient); // queries 대신 state 전체를 반환
}

export const Hydrate = HydrationBoundary;

export default {};
