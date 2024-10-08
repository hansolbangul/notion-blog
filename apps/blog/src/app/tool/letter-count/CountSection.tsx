import { ChangeEvent, PropsWithChildren, useMemo, useState } from "react";
import DotList from "@blog/ui/components/commons/DotList";
import {
  textParagraphLength,
  textLength,
  textLengthWithoutSpaces,
} from "@blog/utils/textFormat";
import { defaultValue } from "@app/(constant)/defaultBlogInfo";

export default function CountSection({ children }: PropsWithChildren) {
  const [totalCharacterCount, setTotalCharacterCount] = useState(
    textLength(defaultValue),
  );
  const [characterCountWithoutSpaces, setCharacterCountWithoutSpaces] =
    useState(textLengthWithoutSpaces(defaultValue));
  const [paragraphCount, setParagraphCount] = useState(
    textParagraphLength(defaultValue),
  );

  const handleCount = (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as
      | HTMLTextAreaElement
      | HTMLInputElement;

    if (target && "value" in target) {
      const value = target.value;
      setTotalCharacterCount(textLength(value));
      setCharacterCountWithoutSpaces(textLengthWithoutSpaces(value));
      setParagraphCount(textParagraphLength(value));
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
      <DotList>
        {valueList.map((value) => (
          <DotList.Item key={value}>{value}</DotList.Item>
        ))}
      </DotList>
    </form>
  );
}
