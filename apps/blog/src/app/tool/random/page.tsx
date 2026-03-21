import React from "react";
import RandomContent from "@app/tool/random/Content";
import type { Metadata } from "next";
import { createToolMetadata } from "@libs/seo";

export const metadata: Metadata = createToolMetadata({
  title: "숫자 랜덤 생성기",
  description:
    "빠르게 랜덤 숫자를 뽑아야 할 때 바로 사용할 수 있는 데굴데굴 블로그의 숫자 랜덤 생성 도구입니다.",
  pathname: "/tool/random",
  keywords: ["숫자 랜덤 생성기", "랜덤 숫자", "프론트엔드 도구"],
});

export default function Page() {
  return <RandomContent />;
}
