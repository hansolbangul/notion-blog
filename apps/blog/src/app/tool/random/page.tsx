import React from "react";
import RandomContent from "@app/tool/random/Content";

export const metadata = {
  title: "숫자 랜덤 생성기",
  description:
    "데굴데굴 블로그의 숫자 랜덤 생성 도구로 빠르고 쉽게 랜덤 숫자를 생성해보세요.",
  openGraph: {
    title: "숫자 랜덤 생성기",
    description: "데굴데굴 블로그에서 제공하는 간편한 랜덤 숫자 생성 도구",
    images: [
      {
        url: "https://blog.hansolbangul.com/main_img.webp",
        alt: "지한솔방울썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["데굴데굴 블로그", "숫자 랜덤 생성", "숫자 랜덤"],
};

export default function Page() {
  return <RandomContent />;
}
