import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export default function TitleSection({ title, children }: Props) {
  return (
    <section className="py-4">
      <h3 className={"text-body18 font-semiBold mb-4"}>{title}</h3>
      {children}
    </section>
  );
}
