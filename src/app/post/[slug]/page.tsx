import * as React from "react";
import PostService from "@/application/services/postService";
import "react-notion-x/src/styles.css";
import NotionPage from "@/components/Notion/NotionPage";
export const dynamicParams = true;
export const revalidate = 1;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const service = new PostService();
  await service.init();

  const posts = await service.getFilterPosts({});

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getFetch(slug: string) {
  const service = new PostService();
  await service.init();

  const posts = await service.getFilterPosts({});

  const post = posts.find((p) => p.slug === slug);
  const blockMap = await service.getPostBlock(post?.id!);

  return {
    post,
    blockMap,
  };
}

export default async function PostDetail({ params: { slug } }: Props) {
  const { blockMap, post } = await getFetch(slug);

  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          <NotionPage blockMap={blockMap} />
        </div>
      )}
    </>
  );
}
