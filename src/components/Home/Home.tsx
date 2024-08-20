"use client";

import React, { Suspense, useCallback, useState } from "react";
import Container from "../Elements/Container";
import Search from "./Search/Search";
import PostList from "./PostList/PostList";
import Commend from "../Post/Commend";
import { useGetPosts } from "@/src/service/usePostService";
import { TPosts } from "@/src/types";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data } = useGetPosts();

  // console.log(data);

  const posts = data as TPosts;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
    },
    [search],
  );

  return (
    <Container.Col className="px-4">
      <Search onChange={onChange} value={search} />
      <Commend
        commendPosts={posts.filter((post) => post.tags?.includes("Recommend"))}
      />
      <Suspense>
        <PostList search={search} posts={posts} />
      </Suspense>
    </Container.Col>
  );
}
