"use client";

import { FaGithub } from "react-icons/fa";
import SocialLoginToggle from "@blog/ui/components/commons/SocialLoginToggle";
import { githubLogin } from "@/app/loginUtils";

export default function GithubLoginButton() {
  return (
    <SocialLoginToggle onClick={githubLogin}>
      <FaGithub size={32} />
    </SocialLoginToggle>
  );
}
