import React from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Container from "../Elements/Container";
import { CONFIG } from "../../../site.config";
import { HeaderItem } from "./Items";

export default function Header() {
  return (
    <div className="sticky-header w-full flex justify-center items-center mb-5 py-5 px-4 bg-opacity-60">
      <div className="flex justify-between max-w-3xl items-center m-auto w-full">
        <HeaderItem.Title />
        <DarkModeSwitch />
      </div>
    </div>
  );
}
