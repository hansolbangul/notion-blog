import React from "react";
import type { Metadata } from "next";
import { createToolMetadata } from "@libs/seo";

export const metadata: Metadata = createToolMetadata({
  title: "바코드 생성기",
  description: "준비 중인 바코드 생성 도구 페이지입니다.",
  pathname: "/tool/barcode",
  keywords: ["바코드 생성기", "개발 도구"],
  noIndex: true,
});

export default async function Page() {
  return <div />;
}
