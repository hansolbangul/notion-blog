import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return <div className={`w-full relative ${className}`}>{children}</div>;
}

Container.Flex = ({ children, className = "" }: Props) => {
  return <div className={`w-full relative flex ${className}`}>{children}</div>;
};

Container.Col = ({ children, className = "" }: Props) => {
  return <div className={`w-full relative flex flex-col ${className}`}>{children}</div>;
};
