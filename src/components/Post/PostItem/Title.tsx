import React from "react";

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return <h1 className="mt-3 mb-2 text-xl md:text-2xl font-bold cursor-pointer ">{title}</h1>;
}
