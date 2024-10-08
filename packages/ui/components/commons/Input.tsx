import { ComponentProps, useRef } from "react";
import { clipboardCopy } from "@blog/utils/clipboard";
import { FaCopy } from "react-icons/fa";

interface Props extends ComponentProps<"input"> {
  enableCopy?: boolean;
}

export default function Input({
  className,
  enableCopy = false,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const copyText = () => {
    if (!inputRef.current?.value) return;
    clipboardCopy(inputRef.current.value).then((res) => {
      if (res) {
        alert("클립보드에 저장되었습니다.");
      } else {
        alert("클립보드에 저장 실패하였습니다.");
      }
    });
  };

  return (
    <div className="relative inline-block w-full">
      <input
        ref={inputRef}
        className={
          "border-2 rounded-lg p-2 text-body14 h-[46px] text-gray-500 disabled:text-gray-300 pr-10 " +
          className
        }
        {...rest}
      />
      {enableCopy && (
        <FaCopy
          onClick={copyText}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
        />
      )}
    </div>
  );
}
