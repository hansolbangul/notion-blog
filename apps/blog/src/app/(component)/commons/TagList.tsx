"use client";

import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import classNames from "classnames";

interface Props {
  tags: string[];
}
export default function TagList({ tags }: Props) {
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") || "/";

  return (
    <div className={"mt-4 w-full flex gap-2 flex-wrap"}>
      {tags.map((tag) => (
        <Link key={tag} href={`/?tag=${tag}`}>
          <div
            key={tag}
            className={classNames("px-2 py-1 rounded-lg bg-gray-100", {
              "bg-gray-300": currentTag === tag,
            })}
          >
            <span className={"text-body13 text-gray-400"}>{tag}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
