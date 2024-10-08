"use client";

import CrossView from "@blog/ui/components/layouts/CrossView";
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
  // {
  //   name: "숫자 추출기",
  //   href: "/tool/random-number",
  // },
  // {
  //   name: "바코드 생성기",
  //   href: "/tool/barcode",
  // },
  // {
  //   name: "base64 인/디코딩",
  //   href: "/tool/base64",
  // },
];

export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CrossView>
      {children}
      <ListViewToggle>
        {TOOLS_LIST.map((tool) => (
          <Link key={tool.name} href={tool.href}>
            <ListViewToggle.shareItem>{tool.name}</ListViewToggle.shareItem>
          </Link>
        ))}
      </ListViewToggle>
    </CrossView>
  );
}
