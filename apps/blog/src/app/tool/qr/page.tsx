import React from "react";
import QrContent from "@app/tool/qr/Content";
import CONFIG from "@blog/notions/site.config";

export const metadata = CONFIG.metadata;

export default function Page() {
  return <QrContent />;
}
