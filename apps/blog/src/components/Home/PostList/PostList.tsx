"use client";

import React, { useEffect, useState } from "react";
import ListComponent from "../../Post/ListComponent";
import { TPosts } from "@blog/notions/types";
import useRouterQuery from "@hook/useRouterQuery";

type Props = {
  search: string;
  posts: TPosts;
};

export default function PostList({ search, posts }: Props) {
  const params = useRouterQuery();
  const tagQuery = params.get("tag") || "All";
  const [filter, setFilter] = useState(posts);

  useEffect(() => {
    setFilter(() => {
      let filters = posts;

      filters = filters.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.summary?.toLowerCase().includes(search.toLowerCase()),
      );

      if (tagQuery !== "All") {
        filters = filters.filter(
          (post) => post && post.tags && post.tags.includes(tagQuery),
        );
      }

      return filters;
    });
  }, [tagQuery, search]);

  return (
    <>
      {filter.map((post) => (
        <ListComponent key={post.id} post={post} />
      ))}
    </>
  );
}
