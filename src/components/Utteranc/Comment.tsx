import React from "react";
import { CONFIG } from "../../../site.config";
import dynamic from "next/dynamic";
import { TPost } from "@/src/types";

const UtterancesComponent = dynamic(
  () => {
    return import("./Utteranc");
  },
  { ssr: false }
);

type Props = {
  post: TPost;
};

export default function Comment({ post }: Props) {
  return <>{CONFIG.utterances.enable && <UtterancesComponent issueTerm={post.title} />}</>;
}
