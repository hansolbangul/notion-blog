import React from "react";

interface DayProps {
  children: React.ReactNode;
  isSunday?: boolean;
}

const Day = ({ children, isSunday }: DayProps) => {
  const textColor = isSunday ? "text-red-500" : "";
  const isNumber =  typeof children === "number";

  return (
    <div  className={`text-xs text-center ${textColor} ${isNumber ? "cursor-pointer" : ""}`}>
      {children}
    </div>
  );
};

export default function Calendar() {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };
  const week = ["S", "M", "T", "W", "T", "F", "S"]; //일주일
  const totalDate = new Date(today.year, today.month, 0).getDate();
  const startDay = new Date(today.year, today.month - 1, 1).getDay();

  const emptyDays = Array.from({ length: startDay }).map((_, i) => <Day key={i} > </Day>);
  const daysOfMonth = Array.from({ length: totalDate }, (_, i) => {
    const day = i + 1;
    const isSunday = (i + startDay) % 7 === 0;
    return <Day key={i + startDay} isSunday={isSunday}>{day}</Day>;
  });
  const weekDays = week.map((day, i) => <Day key={i + day} isSunday={i === 0}>{day}</Day>);

  return (
    <div className="w-full grid grid-cols-7 p-1 gap-y-1">
      {weekDays}
      {emptyDays}
      {daysOfMonth}
    </div>
  );
}