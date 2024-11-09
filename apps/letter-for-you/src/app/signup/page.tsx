import Spacing from "@blog/ui/components/commons/Spacing";
import Input from "@blog/ui/components/commons/Input";
import SignupForm from "@/app/(feature)/signup/SignupForm";

export default function SignupPage() {
  return (
    <main className={"w-full flex flex-col items-center"}>
      <Spacing size={64} />
      <SignupForm />
    </main>
  );
}
