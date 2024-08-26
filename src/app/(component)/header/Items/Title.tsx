import { CONFIG } from "@/site.config";
import Link from "next/link";
import React from "react";

export default function Title() {
  return (
    <Link href={"/"}>
      <div>{CONFIG.blog.title}</div>
    </Link>
  );
}
