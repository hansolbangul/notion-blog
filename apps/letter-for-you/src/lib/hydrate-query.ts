import { HydrationBoundary, dehydrate, QueryKey } from "@tanstack/react-query";
import { queryClient } from "./query-client";

/**
 * 인터페이스 `QueryProps`는 React Query에서 사용하는 쿼리의 키와
 * 데이터를 가져오는 함수(queryFn)를 정의합니다.
 *
 * @template ResponseType - 쿼리 함수가 반환하는 응답 데이터의 타입.
 * @property {QueryKey} queryKey - React Query에서 사용할 쿼리 키.
 * @property {() => Promise<ResponseType> | unknown} queryFn - 쿼리 키와 관련된 데이터를 가져오는 함수.
 */
interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType> | unknown;
}

/**
 * `getDehydratedQuery` 함수는 주어진 쿼리 키와 쿼리 함수를 사용하여
 * 데이터를 사전 패치(prefetch)한 후, 이를 `dehydrate`하여 반환합니다.
 * 이 함수는 주로 서버 사이드에서 데이터를 미리 로드하는 데 사용됩니다.
 *
 * @template Q - `QueryProps`의 제너릭 타입으로, 쿼리 함수의 반환 타입을 지정합니다.
 * @param {Q} queryProps - 쿼리 키와 쿼리 함수를 포함하는 객체.
 * @returns {Promise<object>} - `dehydrate`를 통해 반환된 쿼리 상태 객체.
 *
 * @example
 * const dehydratedState = await getDehydratedQuery({
 *   queryKey: ['todos'],
 *   queryFn: fetchTodos,
 * });
 */
export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,
  queryFn,
}: Q) {
  await queryClient.prefetchQuery({ queryKey, queryFn });

  return dehydrate(queryClient);
}

/**
 * `getDehydratedQueries` 함수는 여러 개의 쿼리 키와 쿼리 함수를 사용하여
 * 데이터를 사전 패치(prefetch)한 후, 이를 `dehydrate`하여 반환합니다.
 * 이 함수는 다수의 쿼리를 한 번에 처리할 때 유용합니다.
 *
 * @template Q - `QueryProps`의 제너릭 타입 배열로, 각각의 쿼리 함수의 반환 타입을 지정합니다.
 * @param {Q[]} queries - 각 쿼리 키와 쿼리 함수를 포함하는 객체들의 배열.
 * @returns {Promise<object>} - `dehydrate`를 통해 반환된 전체 쿼리 상태 객체.
 *
 * @example
 * const dehydratedState = await getDehydratedQueries([
 *   { queryKey: ['todos'], queryFn: fetchTodos },
 *   { queryKey: ['user', userId], queryFn: () => fetchUser(userId) },
 * ]);
 */
export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn }),
    ),
  );

  return dehydrate(queryClient);
}

/**
 * `Hydrate`는 React Query의 `HydrationBoundary` 컴포넌트를 가리키는
 * alias로, 서버에서 미리 가져온(dehydrated) 쿼리 데이터를
 * 클라이언트에서 사용할 수 있도록 제공합니다.
 *
 */
export const Hydrate = HydrationBoundary;
