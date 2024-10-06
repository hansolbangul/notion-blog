import { ChangeEvent, PropsWithChildren, useMemo, useState } from "react";
import DotList from "@blog/ui/components/commons/DotList";

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

  const valueList = useMemo(
    () => [
      `공백 포함: ${totalCharacterCount}`,
      `공백 미 포함: ${characterCountWithoutSpaces}`,
      `문단 수: ${paragraphCount}`,
    ],
    [totalCharacterCount, characterCountWithoutSpaces, paragraphCount],
  );

  return (
    <form onChange={handleCount}>
      {children}
      <DotList data={valueList} />
    </form>
  );
}
