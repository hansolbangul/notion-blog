"use client";

import { Post } from "@/application/domain/post";
import React, { useEffect, useState } from "react";
import Container from "../Elements/Container";
import PostComponent from "../Post/PostComponent";
import useQuery from "@/hook/useQuery";
import { TPosts } from "@/networks/network";

type Props = {
  posts: TPosts;
};

export default function Home({ posts }: Props) {
  const params = useQuery();
  const [filter, setFilter] = useState<TPosts>([]);
  const tagQuery = params.get("tag") || "All";

  useEffect(() => {
    if (tagQuery === "All") {
      setFilter(posts);
    } else {
      setFilter(() => posts.filter((post) => post.tags?.includes(tagQuery)));
    }
  }, [tagQuery]);

  return (
    <Container.Col className="px-4">
      {filter.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Container.Col>
  );
}
