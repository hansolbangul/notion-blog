import { motion } from "framer-motion";
import React, { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {}

export default function Circle({ children, ...rest }: Props) {
  return (
    <div
      className={
        "w-12 h-12 flex justify-center items-center rounded-full font-bold"
      }
      {...rest}
    >
      {children}
    </div>
  );
}

Circle.UpDown = function ({
  children,
  index = 0,
  className,
  style,
}: Props & { index?: number }) {
  return (
    <motion.div
      className={
        "w-12 h-12 flex justify-center items-center bg-yellow-300 rounded-full text-xl font-bold " +
        className
      }
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2 }}
    >
      {children}
    </motion.div>
  );
};
