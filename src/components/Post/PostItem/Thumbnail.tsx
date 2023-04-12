import ALink from "@/components/Elements/ALink";
import Image from "next/image";
import React from "react";

type Props = {
  thumbnail: string;
  slug: string;
};

export default function Thumbnail({ thumbnail, slug }: Props) {
  return (
    <ALink href={`/post/${slug}`}>
      <div className="w-full aspect-video md:h-96 relative cursor-pointer ">
        <Image className="rounded-sm" style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100%" src={thumbnail} alt="thumbnail" />
      </div>
    </ALink>
  );
}
