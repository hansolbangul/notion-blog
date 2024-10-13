"use client";

import Link from "next/link";
import Button from "@blog/ui/components/commons/Button";
import ErrorLottie from "@blog/ui/components/layouts/ErrorLottie";

export default function ErrorButtonWrap() {
  return (
    <>
      <ErrorLottie />
      <div className="flex space-x-4 mt-6">
        <Button.Warring
          onClick={() => typeof window !== undefined && window.history.back()}
        >
          뒤로가기
        </Button.Warring>

        <Link href="/">
          <Button.Primary>새로고침</Button.Primary>
        </Link>
      </div>
    </>
  );
}
