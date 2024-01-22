import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function Thumbnail({ thumbnail }: Props) {
  return (
    <Image
      className="rounded-md"
      fill
      sizes="(max-width: 768px) 100%"
      src={thumbnail}
      alt="thumbnail"
    />
  );
}
