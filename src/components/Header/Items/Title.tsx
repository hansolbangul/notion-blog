import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Title() {
  return (
    <Link href={"/"}>
      <Image alt="logo" src={"/logo.png"} width={126.93} height={48} />
    </Link>
  );
}
