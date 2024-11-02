"use client";

import CONFIG from "@/site.config";
import ListViewToggle from "@blog/ui/components/toggle/ListViewToggle";
import Link from "next/link";

const TOOLS_LIST = [
  {
    name: "글자수 세기",
    href: "/tool/letter-count",
  },
  {
    name: "uuid 생성기",
    href: "/tool/uuid",
  },
  {
    name: "QR 코드 생성기",
    href: "/tool/qr",
  },
  {
    name: "숫자 랜덤 생성기",
    href: "/tool/random",
  },
  // {
  //   name: "바코드 생성기",
  //   href: "/tool/barcode",
  // },
  // {
  //   name: "base64 인/디코딩",
  //   href: "/tool/base64",
  // },
];

export default function ViewToggle() {
  return (
    <>
      {CONFIG.isToolToggleVisible && (
        <ListViewToggle>
          {TOOLS_LIST.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <ListViewToggle.shareItem>{tool.name}</ListViewToggle.shareItem>
            </Link>
          ))}
        </ListViewToggle>
      )}
    </>
  );
}
