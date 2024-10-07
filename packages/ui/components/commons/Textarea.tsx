import { ComponentProps } from "react";

interface Props extends ComponentProps<"textarea"> {
  width?: number;
}

export default function Textarea(props: Props) {
  const { width, style, className, ...rest } = props;
  return (
    <textarea
      className={"border-2 rounded-lg p-2 text-body14 min-h-56 " + className}
      style={{
        width: width ? `${width}px` : "100%",
        ...style,
      }}
      {...rest}
    />
  );
}
