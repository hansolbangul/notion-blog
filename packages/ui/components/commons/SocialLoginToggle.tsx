import { ComponentProps, PropsWithChildren } from "react";

interface Props extends ComponentProps<"button"> {}

export default function SocialLoginToggle({
  children,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={"button"}
      className={
        "p-2 rounded-full shadow shadow-gray-300 flex justify-center items-center w-12 h-12"
      }
      {...rest}
    >
      {children}
    </button>
  );
}
