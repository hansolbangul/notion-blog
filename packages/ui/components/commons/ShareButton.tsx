"use client";

import { HTMLProps } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";

interface Props extends HTMLProps<HTMLAnchorElement> {
  icon?: React.ReactNode;
}

export default function ShareButton({ children, icon, ...props }: Props) {
  return (
    <div className="inline-flex items-center gap-1">
      <a
        {...props}
        className="bg-transparent border-none text-body14 leading-6 text-gray-400"
      >
        {children}
      </a>
      {icon ? icon : <FaRegShareFromSquare />}
    </div>
  );
}
