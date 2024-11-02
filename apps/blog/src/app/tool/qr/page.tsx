import React from "react";
import QrContent from "@app/tool/qr/Content";
import CONFIG from "@blog/notions/site.config";

// 매타데이터 테스트 중
export const metadata = CONFIG.metadata;

export default function Page() {
  return <QrContent />;
}
