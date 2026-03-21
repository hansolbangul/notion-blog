"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import HeaderMenu from "./HeaderMenu";
import CONFIG from "@blog/notions/site.config";

export default function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="relative z-10 flex w-full items-center justify-between gap-4 py-4">
        <a href="/" className="group flex min-w-0 flex-col">
          <span className="text-[11px] uppercase tracking-editorial text-ink-soft">
            frontend archive
          </span>
          <span className="truncate font-display text-[24px] leading-none text-ink custom:text-[30px]">
            {CONFIG.blog.title}
          </span>
        </a>
        <button
          onClick={toggleMenu}
          className="flex h-11 w-11 items-center justify-center border border-line bg-paper-strong text-[22px] text-ink shadow-panel focus:outline-none custom:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
        <ul className="hidden custom:flex items-center gap-2">
          <HeaderMenu />
        </ul>
      </div>
      <AnimatePresence mode={"wait"}>
        {isMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 flex w-full flex-col gap-2 overflow-hidden border border-line bg-paper-strong p-3 text-ink shadow-editorial custom:hidden"
          >
            <HeaderMenu />
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
