"use client";

import Link from "next/link";
import React from "react";
import { useGetUserInfo } from "@/service/userService/useUserService";

export default function HeaderContent() {
  const { data: userInfo } = useGetUserInfo();

  return (
    <div className="flex gap-4 text-base items-center">
      {userInfo?.name ? (
        <>
          <Link href={"/mypage"} className={"text-body14"}>
            {userInfo.name} 님{" "}
            <span className={"hidden custom:inline"}>환영합니다!</span>
          </Link>
          <span className={"text-body14 cursor-pointer"}>로그아웃</span>
        </>
      ) : (
        <>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </>
      )}
    </div>
  );
}
