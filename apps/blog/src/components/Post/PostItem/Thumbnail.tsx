import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function Thumbnail({ thumbnail }: Props) {
  return (
    <div className="w-[120px] h-[100px] relative cursor-pointer overflow-hidden">
      <Image
        className="object-cover rounded-lg" // Ensure the image covers the container
        fill
        sizes="(max-width: 768px) 100%"
        src={thumbnail}
        alt="thumbnail"
      />
    </div>
  );
}
