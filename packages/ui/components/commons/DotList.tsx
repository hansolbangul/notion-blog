import { ComponentProps } from "react";

interface Props extends ComponentProps<"ul"> {
  children: React.ReactNode;
}

export default function DotList({ children, className, ...rest }: Props) {
  return (
    <ul
      className={
        "list-disc pl-5 bg-white rounded-lg w-full space-y-2 max-w-md " +
        className
      }
      {...rest}
    >
      {children}
    </ul>
  );
}

interface ItemProps extends ComponentProps<"li"> {
  children: React.ReactNode;
}

DotList.Item = function ({ children, className, ...rest }: ItemProps) {
  return (
    <li
      className={
        "hover:bg-gray-100 cursor-pointer text-gray-700 w-full " + className
      }
      {...rest}
    >
      {children}
    </li>
  );
};
