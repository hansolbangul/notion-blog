"use client";

import React, { useEffect, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";

export default function DarkModeSwitch() {
  const [mounted, setMounted] = useState<Boolean>(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <>
      {mounted && currentTheme === "dark" ? (
        <MdLightMode className="text-xl cursor-pointer" onClick={() => setTheme("light")} />
      ) : (
        <BsFillMoonFill className="text-xl cursor-pointer" onClick={() => setTheme("dark")} />
      )}
    </>
  );
}
