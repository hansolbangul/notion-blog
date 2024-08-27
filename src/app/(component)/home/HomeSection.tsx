import React, { Suspense } from "react";
import CategorySection from "@app/(component)/home/CategorySection";
import PostList from "@components/Home/PostList/PostList";
import { TPosts } from "@/src/types";

interface Props {
  search: string;
  posts: TPosts;
}

export default function HomeSection({ search, posts }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between mt-6">
      <div className="flex flex-col w-full max-w-[700px] pr-4 px-4">
        <CategorySection />
        <Suspense>
          <PostList search={search} posts={posts} />
        </Suspense>
      </div>
      <div className="w-[300px]">{/* Content for HomeSubContent */}</div>
    </div>
  );
}
