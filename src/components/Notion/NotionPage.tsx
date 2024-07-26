"use client";
// import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import NotionThumbnail from "./NotionItem/Thumbnail";
import NotionRender from "./NotionItem/NotionRender";
import {BlockMap, ExtendedRecordMap} from "notion-types";
import {TPost} from "@/src/types";
import Comment from "../Utteranc/Comment";
import usePostQuery from "@hook/usePostQuery";

export default function NotionPage() {
    const post = usePostQuery();

    if (!post) return null
    return (
        <>
            <div className="-mt-4">
                {post.thumbnail && <NotionThumbnail thumbnail={post.thumbnail}/>}
                <NotionRender post={post} blockMap={post.recordMap}/>
                {post.type[0] === "Post" && (
                    <>
                        <Comment post={post}/>
                    </>
                )}
            </div>
        </>
    );
}
