import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionRender from "./NotionItem/NotionRender";
import { ExtendedRecordMap } from "notion-types";
import { TPost } from "@/src/types";
import Comment from "../Utteranc/Comment";

type Props = {
  blockMap: ExtendedRecordMap;
  post: TPost;
  next?: string | null;
  prev?: string | null;
};

//TODO: 나중에 AI로 요약하는 것 추가
const fetchExternalUrl = async (url?: string) => {
  try {
    const res = await fetch(url ?? "", {
      method: "GET",
      headers: {
        "Content-type": "text/plain",
      },
    });
    return await res.text();
  } catch (e) {
    return undefined;
  }
};

export default async function NotionPage({
  blockMap,
  post,
  next = null,
  prev = null,
}: Props) {
  const externalPost = await fetchExternalUrl(post.URL);

  return (
    <>
      <div className="-mt-4">
        {post.thumbnail && <NotionThumbnail thumbnail={post.thumbnail} />}
        <NotionRender
          post={post}
          blockMap={blockMap}
          next={next}
          prev={prev}
          externalPost={externalPost}
        />
        {post.type[0] === "Post" && (
          <>
            <Comment post={post} />
          </>
        )}
      </div>
    </>
  );
}
