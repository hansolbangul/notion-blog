import * as React from "react";
import PostService from "@/application/services/postService";
import "react-notion-x/src/styles.css";
import NotionPage from "@/components/Notion/NotionPage";
import { Metadata } from "next";
import { CONFIG } from "../../../../site.config";
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

  // const post = posts.find((p) => p.slug === slug);
  const postId = posts.findIndex((p) => p.slug === slug);

  // const blockMap = await service.getPostBlock(post?.id!);
  const blockMap = await service.getPostBlock(posts[postId].id!);

  return {
    post: posts[postId],
    blockMap,
  };
}

export async function generateMetadata({params: {slug}}: Props): Promise<Metadata> {
  const { post } = await getFetch(slug);
    return {
      title: post?.title,
      description: post?.summary || post?.title,
      openGraph: {
        title: post?.id,
        images: [
          {
            url: post?.thumbnail || '',
            alt: post?.title,
          },
        ],
      },
      keywords: post?.tags?.map((tag) => tag),
    }
}

export default async function PostDetail({ params: { slug } }: Props) {
  const { blockMap, post } = await getFetch(slug);

  return (
    <>
      {blockMap && (
        <div className="mt-4">
          <NotionPage blockMap={blockMap} post={post!} />
        </div>
      )}
    </>
  );
}
