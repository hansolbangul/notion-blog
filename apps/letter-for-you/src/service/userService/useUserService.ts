import { useQuery } from "@tanstack/react-query";
import { UserQueryOptions } from "@/service/userService/queries";
import { UseOptions } from "@/service/type";
import { Models } from "appwrite";

export const useGetUserInfo = (options: UseOptions<Models.Session>) =>
  useQuery({
    ...UserQueryOptions.user(),
    ...options,
  });
