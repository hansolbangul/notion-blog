"use client";

import Link from "next/link";
import { useGetUserInfo } from "@/service/userService/useUserService";
import { UserQueryOptions } from "@/service/userService/queries";
import { queryClient } from "@/lib/query-client";
import { useLoginStore } from "@/store/loginStore";

export default function HeaderContent() {
  const { isLogin, setLogin } = useLoginStore();
  const { data: userInfo } = useGetUserInfo({
    enabled: isLogin,
  });

  const onClickLogout = () => {
    UserQueryOptions.userLogout().mutationFn();

    setLogin(false);
    queryClient.invalidateQueries({
      queryKey: UserQueryOptions.userInfo().queryKey,
    });
  };

  return (
    <div className="flex gap-4 text-base items-center">
      {userInfo?.name ? (
        <>
          <Link href={"/mypage"} className={"text-body14"}>
            {userInfo.name} 님{" "}
            <span className={"hidden custom:inline"}>환영합니다!</span>
          </Link>
          <span
            onClick={onClickLogout}
            className={"text-body14 cursor-pointer"}
          >
            로그아웃
          </span>
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
