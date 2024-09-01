import React from "react";
import dynamic from "next/dynamic";
import { TPost } from "@blog/notions/types";
import CONFIG from "@blog/notions/site.config";

const UtterancesComponent = dynamic(
  () => {
    return import("./Utteranc");
  },
  { ssr: false },
);

type Props = {
  post: TPost;
};

export default function Comment({ post }: Props) {
  return (
    <>
      {CONFIG.utterances.enable && (
        <UtterancesComponent issueTerm={post.title} />
      )}
    </>
  );
}
