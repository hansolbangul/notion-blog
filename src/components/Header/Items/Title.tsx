import ALink from "@/components/Elements/ALink";
import Link from "next/link";
import React from "react";
import { CONFIG } from "../../../../site.config";

export default function Title() {
  return (
    // <ALink cache={false} className="font-bold flex cursor-pointer" href={"/"}>
    <Link href={"/"}>
      <div>{CONFIG.blog.title}</div>
    </Link>
    // </ALink>
  );
}
