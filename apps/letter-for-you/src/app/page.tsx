import Link from "next/link";
import React from "react";
import SkyMailLottie from "@blog/ui/components/layouts/SkyMailLottie";
import Typo from "@blog/ui/components/commons/Typo";
import Spacing from "@blog/ui/components/commons/Spacing";

export default function Home() {
  const descriptions = [
    "정해진 시간에만\n열람 가능한\n특별한 편지",
    "소중한 순간을\n기록하고 전해보세요.",
    "당신만의 이야기를 \n편지에 담아보세요.",
  ];

  return (
    <>
      <Spacing size={64} />
      <main className="flex flex-col items-center justify-center p-8 gap-8">
        <div className="flex custom:flex-row flex-col items-center gap-2 justify-center w-full max-w-4xl">
          <div className="w-[375px] min-h-[375px]">
            <SkyMailLottie />
          </div>

          <div className="w-[375px] space-y-4 text-center custom:text-left">
            <h1 className="text-4xl font-bold text-gray-300">딱 그 시간</h1>
            <p className="text-xl text-gray-400 transition-opacity duration-500 ease-in-out whitespace-pre-wrap min-h-[84px]">
              <Typo text={descriptions} ms={60} loop={-1} />
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/write-mail">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-transform duration-200 ease-in-out transform hover:scale-105">
              메일 쓰러 가기
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
