import React from "react";

type Props = {
  summary: string;
};

export default function Summary({ summary }: Props) {
  return <h3 className="mb-2 text-xs md:text-sm md:block hidden">{summary}</h3>;
}
