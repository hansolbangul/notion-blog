import { Suspense } from "react";
import {
  filterPosts,
  getAllSelectItemsFromPosts,
} from "@/src/libs/utils/notion";
import { getCachedPosts } from "@/src/app/postsCache";
import { HeaderLayout } from "@app/(component)/header/HeaderLayout";
import ClientHeader from "@app/(component)/header/ClientHeader";

async function getFetch() {
  const posts = await getCachedPosts();
  const filteredPost = filterPosts(posts);
  const tags = getAllSelectItemsFromPosts("tags", filteredPost);

  return {
    tags: {
      All: filteredPost.length,
      ...tags,
    },
  };
}

export default async function Header() {
  const { tags } = await getFetch();

  return (
    <HeaderLayout>
      <ClientHeader />
    </HeaderLayout>
  );
}
