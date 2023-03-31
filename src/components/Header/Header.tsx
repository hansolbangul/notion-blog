import React from "react";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  return (
    <div className="sticky-header w-full flex justify-center items-center mb-5 py-5 px-4 bg-opacity-60 fixed">
      <DarkModeSwitch />
    </div>
  );
}
