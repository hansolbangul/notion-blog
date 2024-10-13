"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TitleSection from "@blog/ui/components/commons/TitleSection";
import Input from "@blog/ui/components/commons/Input";
import Button from "@blog/ui/components/commons/Button";
import { randomNumber } from "@blog/utils/random";

const tabs = [{ label: "숫자 생성기" }, { label: "로또 번호 생성기" }];

export default function RandomSection() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
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
      count: string;
      min?: string;
      max?: string;
    };

    const count = parseInt(jsonData.count);
    if (!isNaN(count)) {
      const generatedNumbers = Array.from({ length: count }, () =>
        randomNumber(),
      );
      setRandomNumbers(generatedNumbers);
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
              className="flex w-full gap-4 mb-4"
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler}
            >
              <Input
                name={"count"}
                className={"w-full"}
                placeholder={"숫자 개수"}
              />
              <Input name={"min"} className={"w-full"} placeholder={"최소값"} />
              <Input name={"max"} className={"w-full"} placeholder={"최대값"} />
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
                name={"count"}
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
        <div className="w-full flex flex-wrap justify-center items-center gap-2">
          {randomNumbers.map((number, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 flex justify-center items-center bg-yellow-300 rounded-full text-xl font-bold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {number}
            </motion.div>
          ))}
        </div>
      </div>
    </TitleSection>
  );
}
