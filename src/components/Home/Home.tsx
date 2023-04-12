"use client";

import React, { useCallback, useState } from "react";
import Container from "../Elements/Container";
import { TPosts } from "@/networks/network";
import Search from "./Search/Search";
import PostList from "./PostList/PostList";

type Props = {
  posts: TPosts;
};

export default function Home({ posts }: Props) {
  const [search, setSearch] = useState("");
  console.log(posts);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
    },
    [search]
  );

  return (
    <Container.Col className="px-4">
      <Search onChange={onChange} value={search} />
      <PostList search={search} posts={posts} />
    </Container.Col>
  );
}
