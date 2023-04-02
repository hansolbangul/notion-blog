import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  slug: string;
};

export default function Title({ title, slug }: Props) {
  return (
    <Link href={`/post/${slug}`}>
      <div className="mt-3 mb-2 text-xl md:text-2xl font-bold cursor-pointer ">{title}</div>
    </Link>
  );
}
