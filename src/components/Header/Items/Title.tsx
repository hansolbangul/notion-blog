import ALink from "@/components/Elements/ALink";
import React from "react";
import { CONFIG } from "../../../../site.config";

export default function Title() {
  return (
    <ALink cache={false} className="font-bold flex cursor-pointer" href={"/"}>
      <div>{CONFIG.blog.title}</div>
    </ALink>
  );
}
