"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetTags } from "@blog/notions/service/usePostService";

const CategorySection = () => {
  const { data: tags } = useGetTags();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag") || "/";

  const sortedTags = Object.entries(tags || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const getLinkClassName = (tag: string) =>
    `px-3 py-2 ${currentTag === tag ? "border-b-2 border-b-black text-black" : "text-gray-500"} hover:text-gray-800`;

  return (
    <div className="pt-3 flex border-b-2 border-gray-100 sticky top-[56px] left-0 bg-white z-[100]">
      <Link className={getLinkClassName("/")} href="/" passHref>
        <span className="text-body15 cursor-pointer">전체</span>
      </Link>
      {sortedTags.map(([tag, count]) => (
        <Link
          className={getLinkClassName(tag)}
          key={tag}
          href={`/?tag=${tag}`}
          passHref
        >
          <span className="text-body15 cursor-pointer">{tag}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategorySection;
