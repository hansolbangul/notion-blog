import React from "react";
import type { Metadata } from "next";
import { createToolMetadata } from "@libs/seo";

export const metadata: Metadata = createToolMetadata({
  title: "Base64 인코더",
  description: "준비 중인 Base64 인코딩 도구 페이지입니다.",
  pathname: "/tool/base64",
  keywords: ["Base64 인코더", "개발 도구"],
  noIndex: true,
});

export default async function Page() {
  return <div />;
}
