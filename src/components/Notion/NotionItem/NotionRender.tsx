"use client";

import React from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import { Code } from "react-notion-x/build/third-party/code";
import { useEffect, useState } from "react";
// import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import PrevNextBtn from "./PrevNextBtn";
import { BlockMap, ExtendedRecordMap } from "notion-types";
import { TPost } from "@/src/types";
import NotionHeader from "./NotionHeader";

// 'dark' | 'light'
type ThemeStatus = string | undefined;

type Props = {
  blockMap: ExtendedRecordMap;
  post: TPost;
  next: string | null;
  prev: string | null;
};

const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});

const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), { ssr: false });

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

export default function NotionRender({ blockMap, post, next, prev }: Props) {
  return (
    <>
      {blockMap && (
        <NotionRenderer
          className="bg-white"
          recordMap={blockMap}
          mapPageUrl={mapPageUrl}
          fullPage={true}
          showCollectionViewDropdown={false}
          pageTitle={<NotionHeader post={post} />}
          footer={<PrevNextBtn next={next} prev={prev} />}
          disableHeader
          components={{
            Code,
            Modal,
            Pdf,
          }}
          // darkMode={isDark === "dark"}
        />
      )}
    </>
  );
}
