import { ReactNode } from "react";
import getCached from "@blog/notions/libs/react-query/getCached";
import { NOTION_DETAIL_REVALIDATE_SECONDS } from "@blog/notions/constants";

export const revalidate = NOTION_DETAIL_REVALIDATE_SECONDS;

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  const posts = await getCached();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
