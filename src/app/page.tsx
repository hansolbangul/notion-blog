import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import PostService from "@/application/services/postService";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const service = new PostService();
  const isInit = await service.init();
  const res = await service.getAllPost();
  console.log(res);
  
  return <main className={styles.main}>zz</main>;
}
