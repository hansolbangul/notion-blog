import Container from "../components/Elements/Container";
import Home from "../components/Home/Home";
import { DEFAULT_CATEGORY } from "../constants";
import { filterPosts, getAllSelectItemsFromPosts } from "../libs/utils/notion";
import { CONFIG } from "@/site.config";
import { getPosts } from "@/src/apis";
import postQueryOptions from "@/src/service/postService";
import { getDehydratedQueries, Hydrate } from "@/src/app/react-query";
import React from "react";
import { useGetPosts } from "@/src/service/usePostService";
import Test from "@/src/app/(component)/Test";
import { getCachedPosts } from "@/src/app/posts-cache";

// async function getFetch() {
//   const posts = await getPosts();
//   const filteredPost = filterPosts(posts);
//   const tags = getAllSelectItemsFromPosts("tags", filteredPost);
//   const categories = getAllSelectItemsFromPosts("category", filteredPost);
//
//   return {
//     tags: {
//       ...tags,
//     },
//     categories: {
//       [DEFAULT_CATEGORY]: filteredPost.length,
//       ...categories,
//     },
//     posts: filteredPost,
//   };
// }

export const metadata = {
  title: CONFIG.blog.title,
  description: CONFIG.metadata.description,
  openGraph: {
    title: CONFIG.blog.title,
    description: CONFIG.metadata.description,
    images: [
      {
        url: "/main_img.webp" || "",
        alt: "지한솔방울 썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Page() {
  const posts = await getCachedPosts()
  const { queryKey } = postQueryOptions.all();

  const dehydratedState = await getDehydratedQueries([
    {
      queryKey,
      queryFn: () => posts,
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <Home />
      </Container.Col>
    </Hydrate>
  );
}
