"use client";

import React, { Suspense, useCallback, useState } from "react";
import CategorySection from "@app/(component)/home/CategorySection";
import PostList from "@components/Home/PostList/PostList";
import { TPosts } from "@/src/types";
import Search from "@components/Home/Search/Search";
import Link from "next/link";
import TagList from "@app/(component)/commons/TagList";

interface Props {
  posts: TPosts;
  tags: string[];
}

export default function HomeSection({ posts, tags }: Props) {
  const [search, setSearch] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between mt-4">
      <div className="flex flex-col w-full max-w-[700px] pr-4 px-4 relative">
        <Suspense>
          <CategorySection />
          <PostList search={search} posts={posts} />
        </Suspense>
      </div>
      <div className="hidden custom:flex flex-col w-[300px] pl-4 border-l border-gray-200 pt-3">
        <Search onChange={onChange} value={search} />
        <TagList tags={tags} />
      </div>
    </div>
  );
}
