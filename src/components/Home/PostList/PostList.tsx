"use client";

import React, { useEffect, useState } from "react";
import useQuery from "@/src/hook/useQuery";
import { TPosts } from "@/src/types";
import ListComponent from "../../Post/ListComponent";
import ComponentTitle from "../../Common/ComponentTitle";
import { BsChevronRight } from "react-icons/bs";

type Props = {
  search: string;
  posts: TPosts;
  tags: { [tag: string]: number };
};

export default function PostList({ search, posts, tags }: Props) {
  const params = useQuery();
  const [filterPost, setFilterPost] = useState(posts);
  const selectTag = params.get("tag") || "All";

  console.log(selectTag);

  useEffect(() => {
    setFilterPost(() => {
      let filters = posts;

      filters = filters.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.summary?.toLowerCase().includes(search.toLowerCase())
      );

      if (selectTag !== "All") {
        filters = filters.filter((post) => post && post.tags && post.tags.includes(selectTag));
      }

      return filters;
    });
  }, [selectTag, search]);

  const setTag = (event: React.MouseEvent<HTMLDivElement>, tag: string) => {
    event.preventDefault();
    // event.stopPropagation();
    if (selectTag === tag) {
      params.set("tag", "");
    } else {
      params.set("tag", tag);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {Object.keys(tags).map(
        (tag) =>
          (selectTag === tag || selectTag === "All") && (
            <ComponentTitle
              key={tag}
              title={tag}
              rightBtn={
                <div
                  onClick={(e) => setTag(e, tag)}
                  className="flex text-sm items-center space-x-2 font-semibold cursor-pointer"
                >
                  <span>모두보기</span>
                  <BsChevronRight />
                </div>
              }
            >
              {filterPost
                .filter((post) => post.tags?.includes(tag))
                .slice(0, 5)
                .map((post) => (
                  <ListComponent key={post.id} post={post} />
                ))}
              {!!filterPost.length && (
                <div className="flex justify-center rounded-lg py-2 my-2 px-2 md:py-8 md:px-4 border-gray-400 space-x-4 items-center shadow-lg relative hover:-translate-y-2 transition-transform cursor-pointer">
                  <span className="font-bold md:text-lg text-base">더보기</span>
                </div>
              )}
            </ComponentTitle>
          )
      )}
    </div>
  );
}
