"use client";
import Modal from "@/components/Modal/Modal";
import { TSchedules } from "@/networks/network";
import React, { useState } from "react";
import CalendarModal from "./CalendarModal";

type DayProps = {
  children: React.ReactNode;
  isSunday?: boolean;
  important?: boolean;
  modalVisible?: () => void;
};

const Day = ({ children, isSunday, important, modalVisible }: DayProps) => {
  const textColor = isSunday ? "text-red-500" : "";
  const isNumber = typeof children === "number";
  const importantDay = important ? "border-red-500 border rounded-full" : "";

  const clickEvent = () => {
    if (important) {
      modalVisible && modalVisible();
    }
  };

  return (
    <div
      onClick={clickEvent}
      style={{ margin: "0 2px" }}
      className={`text-xs text-center ${textColor} ${isNumber ? "cursor-pointer" : ""} ${importantDay}`}
    >
      {children}
    </div>
  );
};

type Props = {
  schedule: TSchedules;
};

export default function Calendar({ schedule }: Props) {
  const [isScheduleModal, setScheduleModal] = useState(false);
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  };
  const week = ["S", "M", "T", "W", "T", "F", "S"]; //일주일
  const totalDate = new Date(today.year, today.month, 0).getDate();
  const startDay = new Date(today.year, today.month - 1, 1).getDay();

  const emptyDays = Array.from({ length: startDay }).map((_, i) => <Day key={i}> </Day>);
  const daysOfMonth = Array.from({ length: totalDate }, (_, i) => {
    const day = i + 1;
    const isSunday = (i + startDay) % 7 === 0;
    const important = schedule.some((s) => Number(s.date.split("-")[2]) === day);
    return (
      <Day modalVisible={() => setScheduleModal(true)} key={i + startDay} isSunday={isSunday} important={important}>
        {day}
      </Day>
    );
  });
  const weekDays = week.map((day, i) => (
    <Day key={i + day} isSunday={i === 0}>
      {day}
    </Day>
  ));

  return (
    <div className="w-full grid grid-cols-7 p-1 gap-y-1">
      {weekDays}
      {emptyDays}
      {daysOfMonth}
      {isScheduleModal && (
        <Modal outClick={() => setScheduleModal(false)}>
          <CalendarModal />
        </Modal>
      )}
    </div>
  );
}
