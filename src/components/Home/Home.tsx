"use client";

import { Post } from "@/application/domain/post";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../Elements/Container";
import PostComponent from "../Post/PostComponent";
import useQuery from "@/hook/useQuery";
import { TPosts } from "@/networks/network";
import Search from "./Search/Search";
import { useSearchParams } from "next/navigation";

type Props = {
  posts: TPosts;
};

export default function Home({ posts }: Props) {
  const params = useQuery();
  const [filter, setFilter] = useState(posts);
  const [search, setSearch] = useState("");
  const tagQuery = params.get("tag") || "All";

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
    },
    [search]
  );

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
  }, [tagQuery]);

  return (
    <Container.Col className="px-4">
      <Search onChange={onChange} value={search} />
      {filter.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Container.Col>
  );
}
