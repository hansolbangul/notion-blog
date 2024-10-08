import React from "react";
import LetterCountContent from "@app/tool/letter-count/Content";

export const metadata = {
  title: "글자수 세기",
  description:
    "데굴데굴 블로그의 글자수 세기 도구로 쉽고 빠르게 텍스트의 글자수를 확인하세요.",
  openGraph: {
    title: "글자수 세기",
    description: "데굴데굴 블로그에서 제공하는 간편한 글자수 세기 도구",
    images: [
      {
        url: "https://blog.hansolbangul.com/main_img.webp",
        alt: "지한솔방울썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["데굴데굴 블로그", "글자수 세기", "글자수"],
};

export default function Page() {
  return <LetterCountContent />;
}
