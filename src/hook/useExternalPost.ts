"use client";

import { useEffect } from "react";
import { TPost } from "../types";

function getContent(html: Document, query: string) {
  const content = html.querySelector(query);
  const images = content?.querySelectorAll("img");
  const pres = content?.querySelectorAll("pre");
  images?.forEach((image) => image.remove());
  pres?.forEach((pre) => pre.remove());

  if (!content) {
    return "";
  }

  return content?.textContent?.slice(0, 400) + "...";
}

function insertLink(url: string, element: Element) {
  const button = document.createElement("button");
  const link = document.createElement("a");
  button.append(link);
  link.href = url;
  link.target = "_blank";
  link.text = "더보러가기";
  button.className =
    "hover:bg-neutral-500 text-sm rounded-md my-2 px-2 py-1 bg-neutral-900 text-white font-semibold";
  button.style.marginTop = "16px";
  element.append(button);
}

export function useExternalPost(post: TPost, text?: string) {
  useEffect(() => {
    const element = document.querySelector(".notion-page-content-inner");

    if (element && text && post.URL) {
      element.innerHTML = "";
      const domParser = new DOMParser();
      const html = domParser.parseFromString(text, "text/html");
      let content = "";

      if (post.URL.includes("velog")) {
        content = getContent(html, ".atom-one");
      }

      if (post.URL.includes("bangul")) {
        content = getContent(html, ".notion-page-content-inner");
      }

      if (post.URL.includes("code-to-money")) {
        content = getContent(html, "meta[name='description']");
      }

      if (post.URL.includes("notion")) {
        //NOTE: 노션의 초기 로딩화면 때문에 컨텐츠 안보임
        content = getContent(html, ".notion-page-content");
      }

      element.append(content);

      insertLink(post.URL, element);
    }
  }, []);
}
