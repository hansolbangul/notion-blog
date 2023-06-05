import React from "react";
import Container from "../Elements/Container";
import { HeaderItem } from "./Items";
import Menus from "./Items/Menus";

export default function Header() {
  return (
    <Container.Flex className="sticky-header justify-center items-center mb-5 py-5 px-4 bg-opacity-60">
      <div className="flex max-w-3xl items-center m-auto w-full px-2">
        <HeaderItem.Title />
        <div className="flex space-x-3 items-center flex-auto justify-end">
          <Menus />
        </div>
      </div>
    </Container.Flex>
  );
}
