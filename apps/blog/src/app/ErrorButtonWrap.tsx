"use client";

import Link from "next/link";
import Button from "@blog/ui/components/commons/Button";
import NotFoundErrorLottie from "@blog/ui/components/layouts/404ErrorLottie";

export default function ErrorButtonWrap() {
  return (
    <>
      <NotFoundErrorLottie />
      <div className="flex space-x-4 mt-6">
        <Button.Warring
          onClick={() => typeof window !== undefined && window.history.back()}
        >
          뒤로가기
        </Button.Warring>

        <Link href="/">
          <Button.Primary>홈으로</Button.Primary>
        </Link>
      </div>
    </>
  );
}
