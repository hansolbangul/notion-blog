"use client";

import { TTags } from "@/src/types";

interface Props {
  tags: TTags;
}

export default function Tags(props: Props) {
  const { tags } = props;

  return (
    <div className="flex place-content-end">
      <div className="flex gap-8">
        {Object.keys(tags).map((it) => (
          <div key={it}>{it}</div>
        ))}
      </div>
    </div>
  );
}
