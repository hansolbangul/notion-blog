"use client";

import Button from "@blog/ui/components/commons/Button";
import { useRouter } from "next/router";
import ErrorLottie from "@blog/ui/components/layouts/ErrorLottie";

export default function ErrorButtonWrap() {
  const router = useRouter();
  return (
    <>
      <ErrorLottie />
      <div className="flex space-x-4 mt-6">
        <Button.Warring onClick={() => router.back()}>뒤로가기</Button.Warring>

        <Button.Primary onClick={() => router.reload()}>
          새로고침
        </Button.Primary>
      </div>
    </>
  );
}
