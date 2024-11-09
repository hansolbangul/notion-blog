import Spacing from "@blog/ui/components/commons/Spacing";
import GithubLoginButton from "@/app/login/GithubLoginButton";

export default function LoginPage() {
  return (
    <main>
      <Spacing size={64} />
      <div className={"w-full flex justify-center gap-4"}>
        <GithubLoginButton />
      </div>
    </main>
  );
}
