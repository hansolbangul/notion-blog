import React from "react";

type Props = {
  summary: string;
};

export default function Summary({ summary }: Props) {
  return (
    <h3 className="mb-4 max-w-2xl text-body15 leading-7 text-ink-soft">
      {summary}
    </h3>
  );
}
