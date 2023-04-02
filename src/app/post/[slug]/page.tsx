import * as React from "react";
// import { NotionRenderer } from "react-notion-x";
import PostService from "@/application/services/postService";
import Image from "next/image";
import Link from "next/link";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import NotionPage from "@/components/Notion/NotionPage";

// type Props = {
//   post: Post;
//   blockMap: any;
// };

type Props = {
  params: {
    slug: string;
  };
};

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
  console.log(blockMap);

  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          <NotionPage blockMap={JSON.stringify(blockMap)} post={JSON.stringify(post!)} />
        </div>
      )}
    </>
  );
}
