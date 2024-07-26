import React, {Suspense} from "react";
import Container from "../Elements/Container";
import { HeaderItem } from "./Items";
import Dropdown from "../Common/Dropdown";
import { filterPosts, getAllSelectItemsFromPosts } from "@/src/libs/utils/notion";
import {getPosts} from "@/src/apis";

async function getFetch() {
  try {
    const posts = await getPosts();
    const filteredPost = filterPosts(posts);
    const tags = getAllSelectItemsFromPosts("tags", filteredPost);

    return {
      tags: {
        All: filteredPost.length,
        ...tags,
      },
    };
  } catch (error) {
    throw error;
  }
}

export default async function Header() {
  const { tags } = await getFetch();

  return (
    <Container.Flex className="sticky-header justify-center items-center mb-5 py-5 px-4 bg-opacity-60">
      <div className="flex max-w-3xl items-center m-auto w-full px-2">
        <HeaderItem.Title />
        <div className="flex space-x-3 items-center flex-auto justify-end">
          <Suspense>
              <Dropdown tags={tags} />
          </Suspense>
        </div>
      </div>
    </Container.Flex>
  );
}
