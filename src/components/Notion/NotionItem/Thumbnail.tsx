import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function NotionThumbnail({ thumbnail }: Props) {
  return (
    <div className="px-2 w-full aspect-video md:h-96 relative cursor-pointer ">
      <Image style={{ objectFit: "cover" }} fill src={thumbnail} alt="thumbnail" />
    </div>
  );
}
