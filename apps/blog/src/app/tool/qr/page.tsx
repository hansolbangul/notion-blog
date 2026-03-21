import React from "react";
import QrContent from "@app/tool/qr/Content";
import type { Metadata } from "next";
import { createToolMetadata } from "@libs/seo";

export const metadata: Metadata = createToolMetadata({
  title: "QR 코드 생성기",
  description:
    "링크와 텍스트를 바로 QR 코드로 바꿀 수 있는 데굴데굴 블로그의 QR 생성 도구입니다.",
  pathname: "/tool/qr",
  keywords: ["QR 코드 생성기", "QR 생성", "개발 도구"],
});

export default function Page() {
  return <QrContent />;
}
