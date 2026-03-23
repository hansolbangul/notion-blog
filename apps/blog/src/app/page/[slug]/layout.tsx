import { ReactNode } from "react";
import getCached from "@blog/notions/libs/react-query/getCached";
import { isExcludedPageSlug } from "@libs/content";

export const revalidate = 10800;

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  const posts = await getCached({ type: "Page" });

  return posts
    .filter((post) => !isExcludedPageSlug(post.slug))
    .map((post) => ({
    slug: post.slug,
    }));
}
