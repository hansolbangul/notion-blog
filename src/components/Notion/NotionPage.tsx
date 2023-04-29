"use client";
import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionRender from "./NotionItem/NotionRender";
import Comment from "../Utteranc/Comment";

type Props = {
  blockMap: NotionExtendedRecordMap;
  post: TPost;
  next?: string | null;
  prev?: string | null;
};

export default function NotionPage({ blockMap, post, next = null, prev = null }: Props) {
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
