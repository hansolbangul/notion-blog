"use client";
import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import NotionThumbnail from "./NotionItem/Thumbnail";
import Comment from "../Utteranc/Comment";
import NotionRender from "./NotionItem/NotionRender";

type Props = {
  blockMap: NotionExtendedRecordMap;
  post: TPost;
};

export default function NotionPage({ blockMap, post }: Props) {

  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          {post.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
          <NotionRender blockMap={blockMap}/>
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
