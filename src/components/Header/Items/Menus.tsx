import Link from "next/link";
import React from "react";

export default function Menus() {
  return (
    <div className="flex space-x-2">
      <Link href={"/resume"}>Resume</Link>
      <Link href={"project"}>Project</Link>
    </div>
  );
}
