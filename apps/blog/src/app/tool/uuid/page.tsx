import React from "react";
import UuidContent from "@app/tool/uuid/Content";

export const metadata = {
  title: "UUID 생성기",
  description:
    "데굴데굴 블로그의 UUID 생성 도구로 고유한 UUID를 손쉽게 생성해보세요.",
  openGraph: {
    title: "UUID 생성기",
    description: "데굴데굴 블로그에서 제공하는 간편한 UUID 생성 도구",
    images: [
      {
        url: "https://blog.hansolbangul.com/main_img.webp",
        alt: "지한솔방울썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["데굴데굴 블로그", "UUID 생성", "UUID"],
};

export default function Page() {
  return <UuidContent />;
}
