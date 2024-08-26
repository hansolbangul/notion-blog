import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function NotionThumbnail({ thumbnail }: Props) {
  return (
    <div className="w-full aspect-video custom:h-96 relative cursor-pointer">
      <Image
        className={"w-full px-4 mt-5 rounded-lg"}
        style={{ objectFit: "cover" }}
        fill
        src={thumbnail}
        alt="thumbnail"
      />
    </div>
  );
}
