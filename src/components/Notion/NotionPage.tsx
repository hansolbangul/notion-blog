"use client";

import * as React from "react";
// import { NotionRenderer } from "react-notion-x";
import PostService from "@/application/services/postService";
import Image from "next/image";
import Link from "next/link";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import { Post } from "@/application/domain/post";
import dynamic from "next/dynamic";
import { Code } from "react-notion-x/build/third-party/code";
import { useTheme } from "next-themes";

const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});

const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), { ssr: false });

type Props = {
  blockMap: string;
};

// type Props = {
//   params: {
//     slug: string;
//   };
// };

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

export default function NotionPage({ blockMap }: Props) {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      {blockMap && (
        <div className="-mt-4">
          <NotionRenderer
            className="dark:bg-zinc-950 bg-white"
            recordMap={JSON.parse(blockMap)}
            mapPageUrl={mapPageUrl}
            fullPage={true}
            showCollectionViewDropdown={false}
            disableHeader
            // mapImageUrl={mapImgUrl}
            components={{
              //   nextImage: Image,
              //   nextLink: Link,
              Code,
              Modal,
              Pdf,
            }}
            darkMode={currentTheme === "dark"}
          />
        </div>
      )}
    </>
  );
}
