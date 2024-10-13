"use client";

import ErrorLottie from "@blog/ui/components/layouts/ErrorLottie";
import Button from "@blog/ui/components/commons/Button";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="p-6 max-w-md text-center bg-white shadow-lg rounded-lg">
        <ErrorLottie />

        <div className="flex space-x-4 mt-6">
          <Button.Warring onClick={() => router.back()}>
            뒤로가기
          </Button.Warring>

          <Button.Primary onClick={() => router.reload()}>
            새로고침
          </Button.Primary>
        </div>
      </div>
    </div>
  );
}
