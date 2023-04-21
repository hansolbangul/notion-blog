import React from "react";
import Calendar from "./Calendar";

export default function CalendarForm() {
  return (
    <>
      <div className="w-full h-8 flex items-center justify-center">
        <h3 className="text-center text-xs font-bold">Calendar</h3>
      </div>
      <Calendar />
    </>
  );
}
