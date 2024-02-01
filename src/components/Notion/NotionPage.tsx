"use client";
// import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionRender from "./NotionItem/NotionRender";
import { BlockMap, ExtendedRecordMap } from "notion-types";
import { TPost } from "@/src/types";
import Comment from "../Utteranc/Comment";
import { useRouter } from "next/navigation";

type Props = {
  blockMap: ExtendedRecordMap;
  post: TPost;
  next?: string | null;
  prev?: string | null;
};

export default function NotionPage({ blockMap, post, next = null, prev = null }: Props) {
  const router = useRouter();

  if(typeof window !== 'undefined' && post.URL) {
      window.open(post.URL);
      router.back();
  }

  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          {post.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
          <NotionRender post={post} blockMap={blockMap} next={next} prev={prev} />
          {post.type[0] === "Post" && (
            <>
              <Comment post={post} />
            </>
          )}
        </div>
      )}
    </>
  );
}
