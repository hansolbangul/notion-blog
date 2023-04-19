import Link from "next/link";
import React from "react";
import { IoArrowBackSharp, IoArrowForwardSharp, IoArrowUpSharp } from "react-icons/io5";

type Props = {
  next: string | null;
  prev: string | null;
};

export default function PrevNextBtn({ next, prev }: Props) {
  const scrollUp = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-4 mx-0 md:mx-6 flex justify-between">
      {prev ? (
        <Link href={"/post/" + prev} className="flex items-center gap-x-1">
          <IoArrowBackSharp className="text-base" />
          <span className="text-sm font-semibold">back</span>
        </Link>
      ) : (
        <div className="flex items-center gap-x-1">
          <IoArrowUpSharp className="cursor-pointer" onClick={scrollUp} />
          <span className="text-sm font-semibold">up</span>
        </div>
      )}
      {next ? (
        <Link href={"/post/" + next} className="flex items-center gap-x-1">
          <span className="text-sm font-semibold">next</span>
          <IoArrowForwardSharp className="text-base" />
        </Link>
      ) : (
        <div className="flex items-center gap-x-1">
          <span className="text-sm font-semibold">up</span>
          <IoArrowUpSharp className="cursor-pointer" onClick={scrollUp} />
        </div>
      )}
    </div>
  );
}
