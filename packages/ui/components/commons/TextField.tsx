import { ReactNode } from "react";

interface Props {
  text: string;
  htmlFor?: string;
  field: ReactNode;
}

export default function TextField({ text, field, htmlFor }: Props) {
  return (
    <div className={"flex flex-col gap-2"}>
      <label htmlFor={htmlFor}>{text}</label>
      {field}
    </div>
  );
}
