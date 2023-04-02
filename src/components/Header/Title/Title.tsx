import React from "react";
import { CONFIG } from "../../../../site.config";

export default function Title() {
  return <div className=" font-bold">{CONFIG.blog.title}</div>;
}
