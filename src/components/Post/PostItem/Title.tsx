import ALink from "@/components/Elements/ALink";
import React from "react";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <div className="mt-3 mb-2 text-xl md:text-2xl font-bold cursor-pointer ">{title}</div>
  );
}
