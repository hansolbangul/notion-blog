import usePostsQuery from "./usePostsQuery";
import { getAllSelectItemsFromPosts } from "../utils/notion";
import { DEFAULT_CATEGORY } from "../constants";

export const useCategoriesQuery = () => {
  const posts = usePostsQuery();
  const categories = getAllSelectItemsFromPosts("category", posts);

  return {
    [DEFAULT_CATEGORY]: posts.length,
    ...categories,
  };
};
