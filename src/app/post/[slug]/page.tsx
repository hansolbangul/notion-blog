import * as React from "react";
// import { NotionRenderer } from "react-notion-x";
import PostService from "@/application/services/postService";
import Image from "next/image";
import Link from "next/link";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import NotionPage from "@/components/Notion/NotionPage";
import { getPostBlocks, getPosts } from "@/lib/apis";
import { filterPosts } from "@/lib/utils/notion";

export const revalidate = 1;
// type Props = {
//   post: Post;
//   blockMap: any;
// };

type Props = {
  params: {
    slug: string;
  };
};

// async function getFetch(slug: string) {
//   const service = new PostService();
//   await service.init();

//   const posts = await service.getFilterPosts({});

//   const post = posts.find((p) => p.slug === slug);
//   const blockMap = await service.getPostBlock(post?.id!);

//   return {
//     post,
//     blockMap,
//   };
// }
export async function generateStaticParams() {
  const posts = await getPosts();
  const filteredPost = filterPosts(posts, {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
  });

  return filteredPost.map((row) => `/${row.slug}`);
}

async function getFetch(slug: string) {
  //includePages: true
  const posts = await getPosts();
  const post = posts.find((t) => t.slug === slug);
  const blockMap = await getPostBlocks(post?.id!);

  return {
    post,
    blockMap,
  };
}

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
  console.log(blockMap);

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
