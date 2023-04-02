import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  thumbnail: string;
  slug: string;
};

export default function Thumbnail({ thumbnail, slug }: Props) {
  return (
    <Link href={`/post/${slug}`}>
      <div className="w-full aspect-video md:h-96 relative cursor-pointer ">
        <Image className="rounded-sm" style={{ objectFit: "cover" }} fill src={thumbnail} alt="thumbnail" />
      </div>
    </Link>
  );
}
