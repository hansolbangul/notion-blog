interface Props {
  data: string[];
}

export default function DotList({ data }: Props) {
  return (
    <ul
      className={"list-disc pl-5 bg-white rounded-lg w-full space-y-2 max-w-md"}
    >
      {data.map((item) => (
        <li className={"hover:bg-gray-100 cursor-pointer text-gray-700 w-full"}>
          {item}
        </li>
      ))}
    </ul>
  );
}
