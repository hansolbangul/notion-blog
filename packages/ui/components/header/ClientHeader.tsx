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
      <div className="flex items-center justify-between text-gray-300 relative z-10 w-full h-[56px]">
        <a href="/" className="text-[14px] font-semiBold text-gray-600">
          {CONFIG.blog.title}
        </a>
        <button
          onClick={toggleMenu}
          className="text-2xl focus:outline-none custom:hidden"
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
        <ul className="hidden custom:flex items-center ">
          <HeaderMenu />
        </ul>
      </div>
      <AnimatePresence mode={"wait"}>
        {isMenuOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full bg-white overflow-hidden custom:hidden text-gray-300"
          >
            <HeaderMenu />
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
