import React from "react";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <h1 className="mb-2 text-body15 custom:text-body16 font-semiBold cursor-pointer">
      {title}
    </h1>
  );
}
