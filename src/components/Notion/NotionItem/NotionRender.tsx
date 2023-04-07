"use client";

import React from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import { Code } from "react-notion-x/build/third-party/code";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NotionExtendedRecordMap, TPost } from "@/networks/network";
import { useTheme } from "next-themes";
import NotionHeader from "./NotionHeader";

// 'dark' | 'light'
type ThemeStatus = string | undefined;

type Props = {
  blockMap: NotionExtendedRecordMap;
  post: TPost;
};

const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});

const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), { ssr: false });

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

export default function NotionRender({ blockMap, post }: Props) {
  const { systemTheme, theme } = useTheme();

  const [isDark, setTheme] = useState<ThemeStatus>();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(currentTheme);
  }, [theme]);

  return (
    <>
      {isDark && (
        <NotionRenderer
          className="dark:bg-zinc-950 bg-white"
          recordMap={blockMap}
          mapPageUrl={mapPageUrl}
          fullPage={true}
          showCollectionViewDropdown={false}
          pageTitle={<NotionHeader post={post} />}
          disableHeader
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Modal,
            Pdf,
          }}
          darkMode={isDark === "dark"}
        />
      )}
    </>
  );
}
