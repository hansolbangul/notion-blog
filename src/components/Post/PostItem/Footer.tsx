import Image from "next/image";
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
    <div className="mt-2 w-full flex justify-between items-center">
      <div className="flex items-center gap-x-1">
        <Image
          className="rounded-full"
          src={profile && profile[0].profile_photo ? profile[0].profile_photo : "/icons/default_img.png"}
          alt="profile_image"
          width={30}
          height={30}
          style={{ height: "30px" }}
        />
        <span className="text-sm font-semibold">{profile && profile[0].name}</span>
      </div>
      <span className="text-xs md:text-sm">
        {new Intl.DateTimeFormat("ko", { dateStyle: "short" }).format(new Date(start_date))}
      </span>
    </div>
  );
}
