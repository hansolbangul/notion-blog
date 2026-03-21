import React from "react";
import LetterCountContent from "@app/tool/letter-count/Content";
import type { Metadata } from "next";
import { createToolMetadata } from "@libs/seo";

export const metadata: Metadata = createToolMetadata({
  title: "글자수 세기",
  description:
    "텍스트 길이와 글자 수를 빠르게 확인할 수 있는 데굴데굴 블로그의 글자수 세기 도구입니다.",
  pathname: "/tool/letter-count",
  keywords: ["글자수 세기", "텍스트 카운터", "개발 도구"],
});

export default function Page() {
  return <LetterCountContent />;
}
