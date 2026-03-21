import React from "react";
import UuidContent from "@app/tool/uuid/Content";
import type { Metadata } from "next";
import { createToolMetadata } from "@libs/seo";

export const metadata: Metadata = createToolMetadata({
  title: "UUID 생성기",
  description:
    "고유 식별자가 필요할 때 바로 쓸 수 있는 데굴데굴 블로그의 UUID 생성 도구입니다.",
  pathname: "/tool/uuid",
  keywords: ["UUID 생성기", "UUID", "개발 도구"],
});

export default function Page() {
  return <UuidContent />;
}
