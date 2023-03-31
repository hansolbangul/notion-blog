import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import PostService from "@/application/services/postService";
import { TagService } from "@/application/services/tagService";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const service = new PostService();
  // const tagService = new TagService();
  // const isInit = await service.init();
  // const res = await service.getFilterPosts({});
  // const tags = tagService.getAllTag(res);
  // console.log(tags);

  return <div>hello</div>;
}
