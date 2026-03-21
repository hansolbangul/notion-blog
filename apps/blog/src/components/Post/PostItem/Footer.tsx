import React from "react";

type Props = {
  start_date: string;
  profile?: {
    name: string;
    id: string;
    profile_photo?: string | undefined;
  }[];
};

export default function Footer({ start_date, profile }: Props) {
  return (
    <div className="mt-2 flex w-full items-center text-[12px] uppercase tracking-[0.18em] text-ink-soft">
      <span className="date-after">
        {new Intl.DateTimeFormat("ko", { dateStyle: "full" }).format(
          new Date(start_date),
        )}
      </span>
      <span>{profile && profile[0].name}</span>
    </div>
  );
}
