import { ReactNode } from "react";
import getCached from "@blog/notions/libs/react-query/getCached";

export const revalidate = 86400;

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export async function generateStaticParams() {
  const posts = await getCached();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
