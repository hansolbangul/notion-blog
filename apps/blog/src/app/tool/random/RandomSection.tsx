"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TitleSection from "@blog/ui/components/commons/TitleSection";
import Input from "@blog/ui/components/commons/Input";
import Button from "@blog/ui/components/commons/Button";
import { lottoNumber, randomNumber } from "@blog/utils/random";
import Circle from "@blog/ui/components/commons/Circle";
import { v4 } from "uuid";
import { generatePastelColor } from "@blog/utils/color";
import Tab from "@blog/ui/components/commons/Tab";

export default function RandomSection() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  const onChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    const form = new FormData(e.currentTarget);
    const jsonData = Object.fromEntries(form.entries()) as { count: string };

    if (Object.values(jsonData).every((v) => !!v)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const jsonData = Object.fromEntries(form.entries()) as {
      count?: string;
      lotto?: string;
      min?: string;
      max?: string;
    };

    if (jsonData.lotto) {
      const lottoCount = parseInt(jsonData.lotto, 10);

      if (lottoCount > 10) {
        alert("로또 생성기는 최대 10게임까지 가능합니다.");
        return;
      }

      const generatedLottoNumbers = Array.from({ length: lottoCount * 6 }, () =>
        lottoNumber(),
      );
      setRandomNumbers(generatedLottoNumbers);
    } else if (jsonData.count) {
      const count = parseInt(jsonData.count, 10);

      if (count > 100) {
        alert("숫자 생성은 100개까지만 가능합니다.");
        return;
      }

      if (!isNaN(count)) {
        const generatedNumbers = Array.from({ length: count }, () =>
          randomNumber(
            parseInt(jsonData.min || "1", 10),
            parseInt(jsonData.max || "10", 10),
          ),
        );
        setRandomNumbers(generatedNumbers);
      }
    }
  };

  return (
    <TitleSection
      title={"랜덤 생성기"}
      description={"숫자 생성기 또는 로또 번호 생성기를 선택하세요."}
    >
      <form
        className="w-full mb-4"
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      >
        <Tab>
          <Tab.Item name={"숫자 생성기"}>
            <div className="flex flex-col custom:flex-row w-full gap-4 mb-4">
              <Input
                name={"count"}
                className={"w-full"}
                placeholder={"숫자 개수"}
                defaultValue={10}
              />
              <Input
                name={"min"}
                className={"w-full"}
                placeholder={"최소값"}
                defaultValue={0}
              />
              <Input
                name={"max"}
                className={"w-full"}
                placeholder={"최대값"}
                defaultValue={10}
              />
            </div>
          </Tab.Item>
          <Tab.Item name={"로또 번호 생성기"}>
            <Input
              name={"lotto"}
              className={"w-full  mb-4"}
              placeholder={"몇 게임"}
              defaultValue={1}
            />
          </Tab.Item>
        </Tab>
        <div className={"w-full text-right"}>
          <Button.Primary
            className={"w-full custom:w-fit ml-auto"}
            disabled={isDisabled}
            type={"submit"}
          >
            생성하기
          </Button.Primary>
        </div>
      </form>

      <div className="w-full flex flex-col items-center relative gap-4">
        <div className="w-full grid grid-cols-6 gap-2 justify-items-center justify-center items-center">
          {randomNumbers.map((number, index) => (
            <Circle.UpDown
              index={index}
              key={v4()}
              style={{ backgroundColor: generatePastelColor() }}
            >
              {number}
            </Circle.UpDown>
          ))}
        </div>
      </div>
    </TitleSection>
  );
}
