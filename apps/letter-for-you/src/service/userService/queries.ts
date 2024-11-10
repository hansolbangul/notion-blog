import { account } from "@/app/appwrite";
import { OAuthProvider } from "appwrite";
import { serverAccount } from "@/app/node-appwrite";
import userService from "@/service/userService/service";

const queries = {
  all: ["user"] as const,
  session: () => [...queries.all, "session"] as const,
  info: () => [...queries.all, "info"] as const,
};

const LOGIN_COMPLETE_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL + "/login/complete";
const LOGIN_FAIL_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/login/fail";

export const UserQueryOptions = {
  githubLogin: () => ({
    mutationFn: () =>
      account.createOAuth2Session(
        OAuthProvider.Github,
        LOGIN_COMPLETE_BASE_URL,
        LOGIN_FAIL_BASE_URL,
      ),
  }),

  userSession: () => ({
    queryKey: queries.session(),
    queryFn: () => account.getSession("current"),
  }),

  userInfo: () => ({
    queryKey: queries.info(),
    queryFn: () => account.get(),
  }),

  setUserInfo: () => ({
    mutationFn: (props: { jwt: string }) => userService.setUserInfo(props),
  }),
};
