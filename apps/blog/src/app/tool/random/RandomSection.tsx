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

const tabs = [{ label: "숫자 생성기" }, { label: "로또 번호 생성기" }];

export default function RandomSection() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);
  const [prevTab, setPrevTab] = useState<string | null>(null);
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

  const handleTabClick = (tabLabel: string) => {
    setRandomNumbers([]);
    setPrevTab(selectedTab);
    setSelectedTab(tabLabel);
  };

  return (
    <TitleSection
      title={"랜덤 생성기"}
      description={"숫자 생성기 또는 로또 번호 생성기를 선택하세요."}
    >
      <div className="w-full flex">
        <ul className="border rounded-lg flex">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`py-2 px-4 cursor-pointer ${
                selectedTab === tab.label
                  ? "text-blue-500 bg-blue-100"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(tab.label)}
            >
              {tab.label}
              {selectedTab === tab.label && (
                <motion.div
                  className="underline"
                  layoutId="underline"
                  transition={{ duration: 0.2 }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{
            x:
              prevTab &&
              tabs.findIndex((tab) => tab.label === prevTab) <
                tabs.findIndex((tab) => tab.label === selectedTab)
                ? 100
                : -100,
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x:
              prevTab &&
              tabs.findIndex((tab) => tab.label === prevTab) <
                tabs.findIndex((tab) => tab.label === selectedTab)
                ? -100
                : 100,
            opacity: 0,
          }}
          transition={{ duration: 0.3 }}
          className="w-full mt-4"
        >
          {selectedTab === "숫자 생성기" && (
            <form
              className="flex flex-col custom:flex-row w-full gap-4 mb-4"
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler}
            >
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
              <Button.Primary disabled={isDisabled} type={"submit"}>
                생성하기
              </Button.Primary>
            </form>
          )}

          {selectedTab === "로또 번호 생성기" && (
            <form
              className="flex w-full gap-4 mb-4"
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler}
            >
              <Input
                name={"lotto"}
                className={"w-full"}
                placeholder={"몇 게임"}
              />
              <Button.Primary disabled={isDisabled} type={"submit"}>
                생성하기
              </Button.Primary>
            </form>
          )}
        </motion.div>
      </AnimatePresence>

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
