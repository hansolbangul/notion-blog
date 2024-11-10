import { HeaderLayout } from "@blog/ui/components/header/HeaderLayout";
import Button from "@blog/ui/components/commons/Button";
import Link from "next/link";
import React from "react";
import HeaderContent from "@/app/(feature)/header/HeaderContent";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full border-b border-gray-700 z-[1000]">
      <div className="flex justify-between items-center mx-auto w-[90%] max-w-[1400px] min-h-[56px] custom:h-14">
        <Link href={"/"} className="text-xl font-bold ">
          딱 그 시간
        </Link>
        <HeaderContent />
      </div>
    </header>
  );
}
