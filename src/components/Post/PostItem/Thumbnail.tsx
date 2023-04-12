import ALink from "@/components/Elements/ALink";
import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
};

export default function Thumbnail({ thumbnail }: Props) {
  return (
    <div className="w-full aspect-video md:h-96 relative cursor-pointer ">
      <Image className="rounded-sm" style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100%" src={thumbnail} alt="thumbnail" />
    </div>
  );
}
