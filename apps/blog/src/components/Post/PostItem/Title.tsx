import React from "react";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <h1 className="mb-3 font-display text-[26px] leading-[1.18] text-ink custom:text-[30px]">
      {title}
    </h1>
  );
}
