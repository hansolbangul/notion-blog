"use client";

import React from "react";

export const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="sticky top-0 left-0 w-full bg-white border-b border-gray-200 z-[1000]">
      <div className="flex flex-col justify-between items-center mx-auto w-[90%] max-w-[1400px] min-h-[56px] custom:h-14">
        {children}
      </div>
    </header>
  );
};
