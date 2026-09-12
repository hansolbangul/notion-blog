import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function NotionThumbnail({ thumbnail }: Props) {
  return (
    <div className="w-full aspect-[2.4] relative mt-8 overflow-hidden">
      <Image
        className={"w-full grayscale"}
        style={{ objectFit: "cover" }}
        unoptimized
        fill
        src={thumbnail}
        alt="thumbnail"
      />
    </div>
  );
}
