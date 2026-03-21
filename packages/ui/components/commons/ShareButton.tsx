"use client";

import { HTMLProps } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import classNames from "classnames";

interface Props extends HTMLProps<HTMLAnchorElement> {
  icon?: React.ReactNode;
}

export default function ShareButton({
  children,
  className,
  icon,
  ...props
}: Props) {
  return (
    <a
      {...props}
      className={classNames(
        "inline-flex items-center gap-2 border-none bg-transparent text-body14 leading-6 text-ink-soft",
        className,
      )}
    >
      <span className="text-[15px] text-current">
        {icon ? icon : <FaRegShareFromSquare />}
      </span>
      <span>{children}</span>
    </a>
  );
}
