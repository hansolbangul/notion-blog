"use client";

import { FaGithub } from "react-icons/fa";
import SocialLoginToggle from "@blog/ui/components/commons/SocialLoginToggle";
import { UserQueryOptions } from "@/service/userService/queries";

export default function GithubLoginButton() {
  return (
    <SocialLoginToggle onClick={UserQueryOptions.githubLogin().mutationFn}>
      <FaGithub size={32} />
    </SocialLoginToggle>
  );
}
