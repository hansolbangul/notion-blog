import { ReactNode } from "react";
import { getCachedPosts } from "@blog/notions/libs/react-query/getCachePosts";
import { filterPosts } from "@blog/notions/utils/notion";

export const revalidate = 300;

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  const posts = await getCachedPosts();
  const filteredPosts = filterPosts(posts);

  return filteredPosts.map((post) => ({
    slug: post.slug,
  }));
}
