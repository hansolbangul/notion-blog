import { account } from "@/app/appwrite";
import { OAuthProvider } from "appwrite";

const queries = {
  all: ["user"] as const,
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

  user: () => ({
    queryKey: queries.all,
    queryFn: () => account.getSession("current"),
  }),
};
