import { HeaderLayout } from "@blog/ui/components/header/HeaderLayout";
import Button from "@blog/ui/components/commons/Button";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full border-b border-gray-700 z-[1000]">
      <div className="flex justify-between items-center mx-auto w-[90%] max-w-[1400px] min-h-[56px] custom:h-14">
        <h3 className="text-xl font-bold text-white">딱 그 시간</h3>

        <div className="flex gap-4 text-base">
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </header>
  );
}
