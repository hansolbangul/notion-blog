"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { TextTheme } from "../type/theme";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div
        className={`dark:${TextTheme.darkBgColor} dark:${TextTheme.darkText} ${TextTheme.text} transition-colors duration-300 min-h-screen select-none`}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
