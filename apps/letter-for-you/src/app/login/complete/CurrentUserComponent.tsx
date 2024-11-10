"use client";

import { useEffect } from "react";
import Loading from "@/app/(components)/commons/Loading";
import { useGetUserInfo } from "@/service/userService/useUserService";
import { useRouter } from "next/navigation";
import { account } from "@/app/appwrite";
import { UserQueryOptions } from "@/service/userService/queries";

export default function CurrentUserComponent() {
  const router = useRouter();
  const { data: userInfo, isLoading, error } = useGetUserInfo();

  useEffect(() => {
    const syncSessionWithServer = async () => {
      try {
        if (userInfo) {
          const jwtResponse = await account.createJWT();
          const jwt = jwtResponse.jwt;

          const serverResponse =
            await UserQueryOptions.setUserInfo().mutationFn({ jwt });

          if (!serverResponse.ok) {
            throw new Error("Failed to sync session with server");
          }

          console.log("Session synchronized with server");

          router.push("/");
        }
      } catch (syncError) {
        console.error("Error synchronizing session:", syncError);
      }
    };

    if (userInfo) {
      syncSessionWithServer();
    }
  }, [userInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error("Error fetching user info:", error);
    return <div>Error fetching user information. Please try again.</div>;
  }

  return <Loading />;
}
