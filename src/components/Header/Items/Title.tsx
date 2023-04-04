import React from "react";
import { CONFIG } from "../../../../site.config";

export default function Title() {
  return <div className="font-bold flex flex-auto">{CONFIG.blog.title}</div>;
}
