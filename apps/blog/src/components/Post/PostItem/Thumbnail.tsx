import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function Thumbnail({ thumbnail }: Props) {
  return (
    <div className="relative h-[118px] overflow-hidden border border-line bg-paper shadow-panel md:h-[132px] md:w-[148px]">
      <Image
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100%"
        src={thumbnail}
        alt="thumbnail"
      />
    </div>
  );
}
