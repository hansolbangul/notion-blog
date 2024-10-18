import Card from "@blog/ui/components/commons/Card";
import { generatePastelColor } from "@blog/utils/color";

interface Props {
  title: string;
}

const test = [
  "나는 대머리에요.",
  "나는 오늘도 행복합니다. ",
  "나는 왜이렇게 힘들까요!",
  " 나를 위로해 주세요.",
  "나는 친구가 필요해요",
  "나는 지한솔입니다.",
];

export default function ContentSection({ title }: Props) {
  return (
    <div className={"my-10"}>
      <h3 className={"mb-4 ml-2 text-body18"}>{title}</h3>
      <div className={"flex space-x-2 overflow-x-scroll scrollbar-hide w-full"}>
        {test.map((v) => (
          <Card>
            <p
              className={
                "px-6 w-[260px] h-[160px] flex items-center whitespace-pre-wrap rounded-md cursor-pointer"
              }
              style={{
                backgroundColor: generatePastelColor(),
              }}
            >
              {v.trim()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
