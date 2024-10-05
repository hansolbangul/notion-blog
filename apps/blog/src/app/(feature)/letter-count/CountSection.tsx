import { ChangeEvent, PropsWithChildren, useState } from "react";

export default function CountSection({ children }: PropsWithChildren) {
  const [totalCharacterCount, setTotalCharacterCount] = useState(0);
  const [characterCountWithoutSpaces, setCharacterCountWithoutSpaces] =
    useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);

  const handleCount = (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as
      | HTMLTextAreaElement
      | HTMLInputElement;

    if (target && "value" in target) {
      const value = target.value;
      console.log(value);
      setTotalCharacterCount(value.length);
      setCharacterCountWithoutSpaces(
        value.replaceAll(" ", "").replaceAll("\n", "").length,
      );
      setParagraphCount(value.split("\n").length);
    }
  };

  return (
    <form onChange={handleCount}>
      {children}
      <ul
        className={
          "list-disc pl-5 bg-white rounded-lg w-full space-y-2 max-w-md"
        }
      >
        <li className={"hover:bg-gray-100 cursor-pointer text-gray-700 w-full"}>
          공백 포함: {totalCharacterCount}
        </li>
        <li className={"hover:bg-gray-100 cursor-pointer text-gray-700 w-full"}>
          공백 미 포함: {characterCountWithoutSpaces}
        </li>
        <li className={"hover:bg-gray-100 cursor-pointer text-gray-700 w-full"}>
          문단 수: {paragraphCount}
        </li>
      </ul>
    </form>
  );
}
