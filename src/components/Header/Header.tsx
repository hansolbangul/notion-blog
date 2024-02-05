"use client";

import Container from "../Elements/Container";
import { HeaderItem } from "./Items";
import Dropdown from "../Common/Dropdown";
import { TTags } from "@/src/types";
import Search from "../Home/Search/Search";
import { Suspense } from "react";

export default function Header({ tags }: { tags: TTags }) {
  return (
    <Container.Flex className="sticky-header flex-wrap justify-center gap-2 items-center mb-5 py-5 px-4 bg-opacity-60">
      <div className="flex space-x-3 justify-between items-center">
        <HeaderItem.Title />
      </div>
      <div className="flex space-x-3 items-center flex-auto justify-end">
        <Search />
        <Suspense>
          <Dropdown tags={tags} />
        </Suspense>
      </div>
    </Container.Flex>
  );
}
