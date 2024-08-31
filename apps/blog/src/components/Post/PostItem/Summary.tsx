import React from "react";

type Props = {
  summary: string;
};

export default function Summary({ summary }: Props) {
  return (
    <h3 className="mb-2 text-body14 custom:text-body15 text-gray-500">
      {summary}
    </h3>
  );
}
