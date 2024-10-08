import { ComponentProps, useRef } from "react";
import { clipboardCopy } from "@blog/utils/clipboard";
import { FaCopy } from "react-icons/fa";

interface Props extends ComponentProps<"textarea"> {
  enableCopy?: boolean;
}

export default function Textarea({
  enableCopy = false,
  className,
  ...rest
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const copyText = () => {
    if (!textareaRef.current?.value) return;
    clipboardCopy(textareaRef.current.value).then((res) => {
      if (res) {
        alert("클립보드에 저장되었습니다.");
      } else {
        alert("클립보드에 저장 실패하였습니다.");
      }
    });
  };

  return (
    <div className="relative inline-block w-full">
      <textarea
        ref={textareaRef}
        className={
          "border-2 rounded-lg p-2 text-body14 min-h-56 pr-10 " + className
        }
        {...rest}
      />
      {enableCopy && (
        <FaCopy
          onClick={copyText}
          className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
        />
      )}
    </div>
  );
}
