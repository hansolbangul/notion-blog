'use client'

import useScrollRestoration from "@/hook/useScrollRestoration";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  // const pathname = usePathname()
  // // console.log(pathname);
  // console.log(pathname)
  
  // useScrollRestoration(pathname);
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div
        className='dark:bg-zinc-950 dark:text-gray-200 text-gray-900 transition-colors duration-300 min-h-screen select-none'
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
