"use client";

import React, { useEffect, useState } from "react";
import useQuery from "@/src/hook/useQuery";
import { TPosts } from "@/src/types";
import PostComponent from "../../Post/PostComponent";

type Props = {
  search: string;
  posts: TPosts;
};

export default function PostList({ search, posts }: Props) {
  const params = useQuery();
  const tagQuery = params.get("tag") || "All";
  const [filter, setFilter] = useState(posts);

  useEffect(() => {
    setFilter(() => {
      let filters = posts;

      filters = filters.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.summary?.toLowerCase().includes(search.toLowerCase())
      );

      if (tagQuery !== "All") {
        filters = filters.filter((post) => post && post.tags && post.tags.includes(tagQuery));
      }

      return filters;
    });
  }, [tagQuery, search]);

  return (
    <>
      {filter.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </>
  );
}
