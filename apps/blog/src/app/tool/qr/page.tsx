import React from "react";
import QrContent from "@app/tool/qr/Content";

export const metadata = {
  title: "QR 코드 생성기",
  description:
    "데굴데굴 블로그의 QR 코드 생성 도구로 빠르고 쉽게 QR 코드를 생성해보세요.",
  openGraph: {
    title: "QR 코드 생성기",
    description: "데굴데굴 블로그에서 제공하는 간편한 QR 코드 생성 도구",
    images: [
      {
        url: "https://blog.hansolbangul.com/main_img.webp",
        alt: "지한솔방울썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: ["데굴데굴 블로그", "QR 코드 생성", "QR 코드"],
};

export default function Page() {
  return <QrContent />;
}
