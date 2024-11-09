import { UseQueryOptions } from "@tanstack/react-query";

export type UseOptions<T> = Omit<
  UseQueryOptions<T, unknown, T>,
  "queryKey" | "queryFn"
>;
