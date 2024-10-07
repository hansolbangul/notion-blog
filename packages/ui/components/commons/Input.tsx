import { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {}

export default function Input({ className, ...rest }: Props) {
  return (
    <input
      className={
        "border-2 rounded-lg p-2 text-body14 h-[46px] text-gray-500 disabled:text-gray-300 " +
        className
      }
      {...rest}
    />
  );
}
