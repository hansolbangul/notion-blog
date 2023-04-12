"use client";

import React, { useEffect, useState } from "react";
import useQuery from "@/hook/useQuery";
import { TPosts } from "@/networks/network";
import PostComponent from "@/components/Post/PostComponent";

type Props = {
  search: string;
  posts: TPosts;
};

export default function PostList({ search, posts }: Props) {
  const params = useQuery();
  const tagQuery = params.get("tag") || "All";
  const [filter, setFilter] = useState(posts);
  console.log('filter', filter);
  

  useEffect(() => {
    console.log('posts', posts);
    
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
  }, [tagQuery]);

  return (
    <>
      {filter.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </>
  );
}
