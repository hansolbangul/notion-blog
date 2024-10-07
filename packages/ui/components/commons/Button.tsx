import { ComponentProps, PropsWithChildren } from "react";

interface Props extends ComponentProps<"button"> {}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={
        "border-2 rounded-lg px-4 text-body14 h-[46px] text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

Button.Primary = function ({ className, ...rest }: Props) {
  return <Button className={"bg-blue-400 text-white"} {...rest}></Button>;
};

Button.Error = function ({ className, ...rest }: Props) {
  return <Button className={"bg-red-400 text-white"} {...rest}></Button>;
};

Button.Warring = function ({ className, ...rest }: Props) {
  return <Button className={"bg-orange-400 text-white"} {...rest}></Button>;
};
