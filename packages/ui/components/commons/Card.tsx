interface Props {
  children: React.ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div className={"rounded-xl border-gray-400 flex flex-col"}>{children}</div>
  );
}
