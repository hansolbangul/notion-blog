"use client";

import { useGetPosts } from "@/src/service/usePostService";
import React from "react";

const Test = () => {
  const { data: posts } = useGetPosts();

  return <div>{JSON.stringify(posts)}</div>;
};

export default Test;
