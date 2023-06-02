"use client";
import React from "react";
import TagIcon from "../Post/PostItem/TagIcon";
import { TTags } from "@/src/types";
import useQuery from "@/src/hook/useQuery";

type Props = {
  tags: TTags;
};

export default function Tag({ tags }: Props) {
  const params = useQuery();
  const selectTag = params.get("tag") || "All";

  const setTag = (tag: string) => {
    if (selectTag === tag) {
      params.set("tag", "");
    } else {
      params.set("tag", tag);
    }
  };

  return (
    <>
      <div className="flex flex-col absolute h-fit invisible md:visible w-40 p-3 top-20 -left-40">
        {Object.keys(tags).map((tag) => (
          <div
            onClick={() => setTag(tag)}
            className={`p-1 hover:text-slate-500 hover:cursor-pointer flex items-center space-x-1 ${
              selectTag === tag && "text-slate-400"
            }`}
            key={tag}
          >
            <span className="text-sm truncate">{tag}</span>
            <span className="text-xs flex-auto">({tags[tag]})</span>
          </div>
        ))}
      </div>
      <div className="md:hidden px-2 overflow-hidden mb-4">
        <div className="overflow-x-scroll scrollbar-hide flex space-x-1">
          {Object.keys(tags).map((tag) => (
            <TagIcon key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </>
  );
}
