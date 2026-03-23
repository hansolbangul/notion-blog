import React from "react";
import LayoutContent from "@app/tool/LayoutContent";
import getCached from "@blog/notions/libs/react-query/getCached";
import CONFIG from "@blog/notions/site.config";

async function getFetch() {
  const posts = await getCached();

  return {
    posts,
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { posts } = await getFetch();

  if (!CONFIG.isToolToggleVisible) return null;

  return (
    <LayoutContent posts={posts}>{children}</LayoutContent>
  );
}
