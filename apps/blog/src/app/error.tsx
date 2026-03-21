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
    <section className="flex min-h-[calc(100vh-18rem)] items-center justify-center py-10">
      <div className="w-full max-w-[880px] border border-line bg-paper-strong p-6 shadow-editorial sm:p-8">
        <ErrorLottie />
        <p className="mt-6 text-center text-body14 text-ink-soft">
          {error.message}
        </p>
        <div className="mt-6 flex gap-4">
          <Button.Warring
            onClick={() => typeof window !== undefined && router.back()}
          >
            뒤로가기
          </Button.Warring>

          <Button.Primary onClick={reset}>새로고침</Button.Primary>
        </div>
      </div>
    </section>
  );
}
