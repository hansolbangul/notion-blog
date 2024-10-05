import { QueryOptions, useQuery, UseQueryResult } from "@tanstack/react-query";
import postService from "./postService";
import { PostDetail, TCategories, TPosts, TTags } from "../types";
import { getAllSelectItemsFromPosts } from "../utils/notion";

export function useGetPosts() {
  return useQuery<TPosts>({
    ...postService.all(),
    initialData: [],
  });
}

export function useGetPostDetail(
  slug: string,
  options?: QueryOptions,
): UseQueryResult<PostDetail, Error> {
  return useQuery({
    ...postService.detail(slug),
    ...options,
  });
}

export function useGetTags(
  options?: QueryOptions,
): UseQueryResult<TTags, Error> {
  const { data: posts } = useGetPosts();

  return useQuery({
    ...postService.tags(),
    queryFn: () => getAllSelectItemsFromPosts("tags", posts),
    enabled: !!posts,
    ...options,
  });
}

export function ueGetCategories(
  options?: QueryOptions,
): UseQueryResult<TCategories, Error> {
  const { data: posts } = useGetPosts();
  const categories = getAllSelectItemsFromPosts("category", posts);

  return useQuery({
    ...postService.category(),
    ...options,
  });
}
