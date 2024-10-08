"use client";

import Textarea from "@blog/ui/components/commons/Textarea";
import TitleSection from "@blog/ui/components/commons/TitleSection";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input from "@blog/ui/components/commons/Input";
import Button from "@blog/ui/components/commons/Button";
import { v4 } from "uuid";

export default function UuidSection() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [uuidList, setUuidList] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement;
    if (target.name === "uuidCount") {
      setIsDisabled(target.value.length === 0);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const jsonData = Object.fromEntries(form.entries()) as {
      uuidCount: string;
    };

    const count = parseInt(jsonData.uuidCount, 10);
    if (!isNaN(count)) {
      const uuids = Array.from({ length: count }, () => v4()).join("\n");
      setUuidList(uuids);
    } else {
      setUuidList("");
    }
  };

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
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
        >
          <Input
            defaultValue={1}
            name={"uuidCount"}
            type={"number"}
            className={"flex-auto"}
            placeholder={"생성한 uuid의 수량을 적어주세요."}
          />
          <Button.Primary disabled={isDisabled} type={"submit"}>
            생성하기
          </Button.Primary>
        </form>
        <Textarea className={"w-full"} enableCopy readOnly value={uuidList} />
      </TitleSection>
    </>
  );
}
