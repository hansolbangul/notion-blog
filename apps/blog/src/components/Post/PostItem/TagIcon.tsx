"use client";
import useQuery from "@/src/hook/useQuery";
import React from "react";

type Props = {
    tag: string;
    isRouter?: boolean;
};

export default function TagIcon({tag, isRouter = true}: Props) {
    const params = useQuery();
    const selectTag = params.get("tag") || "All";

    const setTag = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        // event.stopPropagation();
        if (!isRouter) return;
        if (selectTag === tag) {
            params.set("tag", "");
        } else {
            params.set("tag", tag);
        }
    };

    return (
        <span
            onClick={(event) => setTag(event)}
            className="hover:bg-neutral-500 text-xs md:text-sm rounded-md px-2 py-1 bg-neutral-900 text-white font-semibold cursor-pointer flex-none hidden first:block md:block"
        >
      {tag}
    </span>
    );
}
