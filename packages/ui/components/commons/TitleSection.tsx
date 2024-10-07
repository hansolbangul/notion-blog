import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
}

export default function TitleSection({ title, description, children }: Props) {
  return (
    <section className="py-4">
      <h3 className={"text-body18 font-semiBold mb-4"}>{title}</h3>
      {description && <p className={"mb-4 text-body15"}>{description}</p>}
      {children}
    </section>
  );
}
