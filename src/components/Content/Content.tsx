import React from "react";
import { CONFIG } from "../../../site.config";
import { CalendarForm } from "./Calendar";

export default function Content() {
  return (
    <>
      <div style={{ height: "-webkit-fill-available" }} className="hidden md:block absolute w-40 top-20 -right-40">
        <div className="flex flex-col sticky h-fit top-40">
          <CalendarForm />
        </div>
      </div>
    </>
  );
}
