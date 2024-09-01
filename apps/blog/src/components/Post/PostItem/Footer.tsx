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
    <div className="mt-2 w-full flex items-center">
      <span className="text-body12 custom:text-body13 date-after text-gray-300">
        {new Intl.DateTimeFormat("ko", { dateStyle: "full" }).format(
          new Date(start_date),
        )}
      </span>
      <span className="text-body12 custom:text-body13 text-gray-300">
        {profile && profile[0].name}
      </span>
    </div>
  );
}
