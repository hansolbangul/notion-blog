import React from "react";

type Props = {
  summary: string;
};

export default function Summary({ summary }: Props) {
  return <div className="mb-2 text-xs md:text-sm">{summary}</div>;
}
