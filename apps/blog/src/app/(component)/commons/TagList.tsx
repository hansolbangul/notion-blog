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
    <div className="mt-2 w-full">
      <span className="mb-3 block text-[11px] uppercase tracking-editorial text-ink-soft">
        popular tags
      </span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag} href={`/?tag=${tag}`}>
            <div
              className={classNames(
                "rounded-full border border-line bg-paper px-3 py-2",
                {
                  "border-accent bg-accent-soft": currentTag === tag,
                },
              )}
            >
              <span
                className={classNames("text-body13 text-ink-soft", {
                  "text-ink": currentTag === tag,
                })}
              >
                {tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
