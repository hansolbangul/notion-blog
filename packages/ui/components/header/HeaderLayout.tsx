"use client";

import React from "react";

export const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="editorial-glass sticky top-0 left-0 z-[1000] w-full border-b border-line">
      <div className="mx-auto flex w-full max-w-[1260px] flex-col justify-between px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
};
