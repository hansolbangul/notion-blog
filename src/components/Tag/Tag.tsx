"use client";
import { Tags } from "@/application/domain/tag";
import React from "react";
import useQuery from "@/hook/useQuery";
import TagIcon from "../Post/PostItem/TagIcon";
import { TextTheme } from "@/app/type/theme";

type Props = {
  tags: Tags;
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
            className={`p-1 hover:${TextTheme.hover} hover:cursor-pointer flex items-center space-x-1 ${
              selectTag === tag && "text-slate-400"
            }`}
            key={tag}
          >
            <span className="text-sm truncate">{tag}</span>
            <span className="text-xs flex-auto">({tags[tag]})</span>
          </div>
        ))}
      </div>
      <div className="md:hidden px-2 overflow-hidden">
        <div className="overflow-x-scroll scrollbar-hide flex space-x-1">
          {Object.keys(tags).map((tag) => (
            <TagIcon key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </>
  );
}
