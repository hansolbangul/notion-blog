"use client";

import TitleSection from "@blog/ui/components/commons/TitleSection";
import Textarea from "@blog/ui/components/commons/Textarea";
import React from "react";
import CountSection from "@app/tool/letter-count/CountSection";
import { defaultValue } from "@app/(constant)/defaultBlogInfo";

export default function LetterCountContent() {
  return (
    <>
      <CountSection>
        <TitleSection title={"글자수 세기"}>
          <Textarea defaultValue={defaultValue} className={"w-full"} />
        </TitleSection>
      </CountSection>
    </>
  );
}
