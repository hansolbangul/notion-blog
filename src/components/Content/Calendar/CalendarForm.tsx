import React, { use } from "react";
// import Calendar from "./Calendar";
import { CONFIG } from "../../../../site.config";

// async function getFetch() {
//   const postService = new PostService();
//   await postService.init();

//   const schedule = await postService.getFilterSchedule();

//   return { schedule };
// }

export default function CalendarForm() {
  // const { schedule } = use(getFetch());

  return (
    <>
      <div className="w-full h-8 flex items-center justify-center">
        <h3 className="text-center text-xs font-bold">{CONFIG.blog.calendarTitle}</h3>
      </div>
      {/* <Calendar schedules={schedule} /> */}
    </>
  );
}
