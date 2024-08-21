import {
  QueryOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import postService from "@/src/service/postService";
import { getAllSelectItemsFromPosts } from "@libs/utils/notion";
import { TPost, TPosts, TTags, TCategories, PostDetail } from "@/src/types";

export function useGetPosts() {
  return useQuery({
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
