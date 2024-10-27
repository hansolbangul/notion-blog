import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";
import { PostDetail, TPosts } from "../../types";
import pageService from "./pageService";

export function useGetPages() {
  return useQuery<TPosts>({
    ...pageService.all(),
    initialData: [],
  });
}

export function useGetPageDetail(
  slug: string,
  options?: QueryOptions,
): UseQueryResult<PostDetail, Error> {
  return useQuery({
    ...pageService.detail(slug),
    ...options,
  });
}
