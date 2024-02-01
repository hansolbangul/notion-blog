"use client";

import React, { FormEvent, Suspense, useCallback, useState } from "react";
import PostList from "./PostList/PostList";
import { TPosts, TTags } from "@/src/types";
import Tags from "./Tags/Tags";
import Header from "../Header/Header";

type Props = {
  posts: TPosts;
  tags: TTags;
};

export default function Home({ posts, tags }: Props) {
  const [search, setSearch] = useState("");

  const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData.entries());

    setSearch(object["search-keyword-input"] as string);
  };

  return (
    <form onChange={handleFormChange}>
      <Header tags={tags} />
      <Suspense>
        <PostList search={search} posts={posts} tags={tags} />
      </Suspense>
    </form>
  );
}
