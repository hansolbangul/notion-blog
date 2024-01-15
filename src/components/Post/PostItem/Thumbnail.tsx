import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function Thumbnail({ thumbnail }: Props) {
  return (
    <div className="w-[180px] min-x-[180px] aspect-video rounded-md relative cursor-pointer">
      <Image className="rounded-md" fill sizes="(max-width: 768px) 100%" src={thumbnail} alt="thumbnail" />
    </div>
  );
}
