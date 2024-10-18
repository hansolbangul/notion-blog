import { HeaderLayout } from "@blog/ui/components/header/HeaderLayout";
import Button from "@blog/ui/components/commons/Button";
import Link from "next/link";

export default function Header() {
  return (
    <HeaderLayout>
      <div className={"w-full h-full flex justify-between items-center"}>
        <p className={"w-full"}>
          <Link href={"/"} className={"text-body20"}>
            나에게로 쓰는 편지
          </Link>
        </p>
        <Link className={"flex-0"} href={"/letter/write"}>
          <Button.Primary>쪽지 쓰기</Button.Primary>
        </Link>
      </div>
    </HeaderLayout>
  );
}
