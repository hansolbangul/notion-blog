// "use client";
// import React, { useState } from "react";
// import style from "./calendar.module.css";
// import { IoMdShareAlt } from "react-icons/io";

// type DayProps = {
//   children: React.ReactNode;
//   isSunday?: boolean;
//   important?: boolean;
//   modalVisible?: () => void;
// };

// const Day = ({ children, isSunday, important, modalVisible }: DayProps) => {
//   const isToday = new Date().getDate() === children;
//   const textColor = isToday ? "text-yellow-500" : isSunday ? "text-red-500" : "";
//   const isNumber = typeof children === "number";
//   const importantDay = important ? "border-red-500 border rounded-full" : "";

//   const clickEvent = () => {
//     if (isNumber) {
//       modalVisible && modalVisible();
//     }
//   };

//   return (
//     <div
//       onClick={clickEvent}
//       style={{ margin: "0 2px" }}
//       className={`text-xs text-center ${textColor} ${isNumber ? "cursor-pointer" : ""} ${importantDay}`}
//     >
//       {children}
//     </div>
//   );
// };

// type Props = {
//   schedules: TScheduleObj;
// };

// export default function Calendar({ schedules }: Props) {
//   const [isSchedule, setSchedule] = useState(new Date().getDate());
//   const today = {
//     year: new Date().getFullYear(),
//     month: new Date().getMonth() + 1,
//     date: new Date().getDate(),
//     day: new Date().getDay(),
//   };
//   const week = ["S", "M", "T", "W", "T", "F", "S"]; //일주일
//   const totalDate = new Date(today.year, today.month, 0).getDate();
//   const startDay = new Date(today.year, today.month - 1, 1).getDay();

//   const emptyDays = Array.from({ length: startDay }).map((_, i) => <Day key={i}> </Day>);
//   const daysOfMonth = Array.from({ length: totalDate }, (_, i) => {
//     const day = i + 1;
//     const isSunday = (i + startDay) % 7 === 0;
//     const important = schedules[String(day).padStart(2, "0")] ? true : false;
//     return (
//       <Day modalVisible={() => setSchedule(day)} key={i + startDay} isSunday={isSunday} important={important}>
//         {day}
//       </Day>
//     );
//   });

//   const weekDays = week.map((day, i) => (
//     <Day key={i + day} isSunday={i === 0}>
//       {day}
//     </Day>
//   ));

//   const route = (slug: string) => {
//     if (slug) window.open(slug);
//   };

//   return (
//     <>
//       <div className="w-full grid grid-cols-7 p-1 gap-y-1">
//         {weekDays}
//         {emptyDays}
//         {daysOfMonth}
//       </div>
//       {schedules[String(isSchedule).padStart(2, "0")] && (
//         <div className="p-1">
//           {schedules[String(isSchedule).padStart(2, "0")].map((schedule) => (
//             <div
//               key={schedule.id}
//               onClick={() => route(schedule.slug)}
//               className={schedule.slug ? "mb-2 " + style.flip : "mb-2 " + style.no_flip}
//             >
//               <div className={style.form}>
//                 <h2 className={"text-xs " + style.front} key={schedule.id}>
//                   {schedule.title}
//                 </h2>
//                 <div className={"flex justify-between items-center " + style.back}>
//                   <h2 className={"text-xs"}>링크 이동하기</h2>
//                   <IoMdShareAlt />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
import React from 'react'

export default function Calendar() {
  return (
    <div>Calendar</div>
  )
}
