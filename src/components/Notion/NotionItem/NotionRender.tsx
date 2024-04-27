"use client";

import React, { useEffect } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import { Code } from "react-notion-x/build/third-party/code";
import PrevNextBtn from "./PrevNextBtn";
import { ExtendedRecordMap } from "notion-types";
import { TPost } from "@/src/types";
import NotionHeader from "./NotionHeader";
import { useExternalPost } from "@/src/hook/useExternalPost";

type Props = {
  blockMap: ExtendedRecordMap;
  post: TPost;
  next: string | null;
  prev: string | null;
  externalPost?: string;
};

const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

export default async function NotionRender({
  blockMap,
  post,
  next,
  prev,
  externalPost,
}: Props) {
  useExternalPost(post, externalPost);

  return (
    <div className="h-full">
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
      />
    </div>
  );
}
