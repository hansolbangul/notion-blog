import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import PostService from "@/application/services/postService";
import { CONFIG } from "../../site.config";
import { TagService } from "@/application/services/tagService";
import { Metadata } from "next";
import { Fragment } from "react";
import Tag from "@/components/Tag/Tag";


async function getFetch() {
  const postService = new PostService();
  const tagService = new TagService();
  await postService.init();

  const posts = await postService.getFilterPosts({});
  const tags = tagService.getAllTag(posts);
  
  return {posts, tags};

}

export async function generateMetadata({
  
}): Promise<Metadata> {
  const {posts, tags} = await getFetch();
  return {
    title: CONFIG.metadata.title || 'V-BLOG',
    description: '',
    openGraph: {
      images: [
        {
          url: '',
          alt: ''
        },
      ],
    },
    keywords: Object.keys(tags).map((tag) => tag),
  };
}


export default async function Home() {
  const {posts, tags} = await getFetch();
  // console.log(posts);
  
  // const service = new PostService();
  // const tagService = new TagService();
  // const isInit = await service.init();
  // const res = await service.getFilterPosts({});
  // const tags = tagService.getAllTag(res);
  // console.log(tags);

  return <div className="w-full flex h-auto relative">
    <Tag tags={tags} />
    <div className="">
      <div className=" min-h-screen"></div>
      <div className=" min-h-screen"></div>
      <div className=" min-h-screen"></div>
      <div className=" min-h-screen"></div>
    </div>
  </div>;
}
