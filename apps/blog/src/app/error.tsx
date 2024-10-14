"use client";

import { useEffect } from "react";
import Button from "@blog/ui/components/commons/Button";
import { useRouter } from "next/navigation";
import ErrorLottie from "@blog/ui/components/layouts/ErrorLottie";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col p-4 relative">
      <div className="p-6 w-full fixed max-w-[800px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ErrorLottie />
        <p className="mt-6 text-center">{error.message}</p>
        <div className="flex space-x-4 mt-6">
          <Button.Warring
            onClick={() => typeof window !== undefined && router.back()}
          >
            뒤로가기
          </Button.Warring>

          <Button.Primary onClick={reset}>새로고침</Button.Primary>
        </div>
      </div>
    </div>
  );
}
