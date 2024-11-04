"use client";
import { TypoAnimated } from "@hansolbangul/animated-typo";

interface Props {
  text: string | string[];
  loop?: number;
  ms?: number;
  wait?: number;
}

export default function Typo({ text, loop = 2, ms = 100, wait = 1000 }: Props) {
  return <TypoAnimated text={text} ms={ms} wait={wait} loop={loop} />;
}
