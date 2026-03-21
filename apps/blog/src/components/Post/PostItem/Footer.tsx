import React from "react";

type Props = {
  start_date: string;
  readingMinutes?: number;
  profile?: {
    name: string;
    id: string;
    profile_photo?: string | undefined;
  }[];
};

export default function Footer({ start_date, readingMinutes, profile }: Props) {
  return (
    <div className="mt-2 flex w-full flex-wrap items-center gap-y-1 text-[12px] uppercase tracking-[0.18em] text-ink-soft">
      <span className="date-after">
        {new Intl.DateTimeFormat("ko", { dateStyle: "full" }).format(
          new Date(start_date),
        )}
      </span>
      {typeof readingMinutes === "number" && (
        <span className="date-after">약 {readingMinutes}분 읽기</span>
      )}
      <span>{profile && profile[0].name}</span>
    </div>
  );
}
