import * as React from "react";
import PostService from "@/application/services/postService";
import "react-notion-x/src/styles.css";
import NotionPage from "@/components/Notion/NotionPage";
import { getPosts } from "@/lib/apis";
import { filterPosts } from "@/lib/utils/notion";
export const dynamicParams = true;
export const revalidate = 1;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPosts();
  const filteredPost = filterPosts(posts);

  return filteredPost.map((post) => ({
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

// async function getFetch(slug: string) {
//   //includePages: true
//   const posts = await getPosts();
//   const post = posts.find((t) => t.slug === slug);
//   const blockMap = await getPostBlocks(post?.id!);

//   return {
//     post,
//     blockMap,
//   };
// }

// async function getFetch() {
//   const BASE_URL = "https://notion-api.splitbee.io/v1/page";
//   const block = await fetch(BASE_URL + `/${process.env.NOTION_PAGE_ID}`);
//   return {
//     blockMap: await block.json(),
//   };
// }

export default async function PostDetail({ params: { slug } }: Props) {
  const { blockMap, post } = await getFetch(slug);
  // const { blockMap } = await getFetch();

  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          {/* <NotionPage blockMap={JSON.stringify(blockMap)} post={JSON.stringify(post!)} /> */}
          <NotionPage blockMap={JSON.stringify(blockMap)} />
        </div>
      )}
    </>
  );
}
