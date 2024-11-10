import { useQuery } from "@tanstack/react-query";
import { UserQueryOptions } from "@/service/userService/queries";
import { UseOptions } from "@/service/type";
import { Models } from "appwrite";

export const useGetUserSession = (options?: UseOptions<Models.Session>) =>
  useQuery({
    ...UserQueryOptions.userSession(),
    ...options,
  });

export const useGetUserInfo = (
  options?: UseOptions<Models.User<Models.Preferences>>,
) =>
  useQuery({
    ...UserQueryOptions.userInfo(),
    ...options,
  });
