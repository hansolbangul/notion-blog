import Link from "next/link";
import React from "react";

interface Props {
  tags: string[];
}
export default function TagList({ tags }: Props) {
  return (
    <div className={"mt-4 w-full flex gap-2 flex-wrap"}>
      {tags.map((tag) => (
        <Link key={tag} href={`/?tag=${tag}`}>
          <div key={tag} className={"px-2 py-1 rounded-lg bg-gray-100"}>
            <span className={"text-body13 text-gray-400"}>{tag}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
