"use client";
import useQuery from "@/hook/useQuery";
import Link from "next/link";
import React from "react";

type Props = {
  tag: string;
};

export default function TagIcon({ tag }: Props) {
  const params = useQuery();
  const selectTag = params.get("tag") || "All";

  const setTag = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (selectTag === tag) {
      params.set("tag", "");
    } else {
      params.set("tag", tag);
    }
  };

  return (
    <span
      onClick={(event) => setTag(event)}
      className="hover:bg-neutral-500 dark:hover:bg-gray-400 text-xs md:text-sm rounded-md px-2 py-1 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold cursor-pointer flex-none"
    >
      {tag}
    </span>
  );
}
