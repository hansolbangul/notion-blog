"use client";

import Image from "next/image";
import React from "react";

type Props = {
  errorType?: "NOT_FOUND" | "UNKNOWN";
};

export default function error() {
  return (
    <div className={`m-auto max-w-4xl bg-white dark:bg-zinc-700 rounded-3xl py-12 px-6 shadow-md mx-2`}>
      <div className="py-20 flex flex-col items-center gap-10">
        <div className="text-6xl flex  items-center">
          <div>4</div>
          <div>0</div>
          <div>4</div>
        </div>
        <div className="text-3xl text-gray-500">Post not found</div>
      </div>
    </div>
  );
}
