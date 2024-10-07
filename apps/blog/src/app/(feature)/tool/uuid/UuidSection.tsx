"use client";

import Textarea from "@blog/ui/components/commons/Textarea";
import TitleSection from "@blog/ui/components/commons/TitleSection";
import React from "react";
import Input from "@blog/ui/components/commons/Input";
import Button from "@blog/ui/components/commons/Button";

export default function UuidSection() {
  return (
    <>
      <TitleSection
        title={"UUID 생성기"}
        description={
          "UUID는 난수를 통한 고유한 식별자입니다. UUID v4를 사용하여 구현되어있습니다."
        }
      >
        <form
          className={"flex w-full gap-4 mb-4"}
          onChange={(e) => {
            e.preventDefault();
            console.log(e.target); // 선택된 값이 출력됨
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.currentTarget;
            const form = new FormData(value);
            const jsonData = Object.fromEntries(form.entries());

            console.log(jsonData);
          }}
        >
          <Input
            className={"flex-auto"}
            placeholder={"생성한 uuid의 수량을 적어주세요."}
          />
          <Button.Primary type={"submit"}>생성하기</Button.Primary>
          <Button.Error type={"submit"}>생성하기</Button.Error>
          <Button.Warring type={"submit"}>생성하기</Button.Warring>
        </form>
        <Textarea readOnly />
      </TitleSection>
    </>
  );
}
