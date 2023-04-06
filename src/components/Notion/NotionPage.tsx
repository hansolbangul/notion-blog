"use client";
import * as React from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import dynamic from "next/dynamic";
import { Code } from "react-notion-x/build/third-party/code";
import { useTheme } from "next-themes";
import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import Link from "next/link";
import Image from "next/image";
import { TextTheme } from "@/type/theme";
import NotionThumbnail from "./NotionItem/Thumbnail";
import Comment from "../Utteranc/Comment";

const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});

const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), { ssr: false });

type Props = {
  blockMap: NotionExtendedRecordMap;
  post: TPost
};

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

export default function NotionPage({ blockMap, post }: Props) {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  
  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          {post.thumbnail && <NotionThumbnail thumbnail={post.thumbnail}/>}
          <NotionRenderer
            className="dark:bg-zinc-950 bg-white"
            recordMap={blockMap}
            mapPageUrl={mapPageUrl}
            fullPage={true}
            showCollectionViewDropdown={false}
            disableHeader
            components={{
              nextImage: Image,
              nextLink: Link,
              Code,
              Modal,
              Pdf,
            }}
            darkMode={currentTheme === "dark"}
          />
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
