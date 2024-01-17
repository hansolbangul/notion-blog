"use client";

import React, { useCallback, useState } from "react";
import Search from "./Search/Search";
import PostList from "./PostList/PostList";
import { TPosts, TTags } from "@/src/types";
import Tags from "./Tags/Tags";

type Props = {
  posts: TPosts;
  tags: TTags;
};

export default function Home({ posts, tags }: Props) {
  const [search, setSearch] = useState("");

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
    },
    [search]
  );

  return (
    <>
      <Search onChange={onChange} value={search} />
      <Tags tags={tags} />
      <PostList search={search} posts={posts} tags={tags} />
    </>
  );
}
