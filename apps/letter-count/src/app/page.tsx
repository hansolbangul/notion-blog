import TitleSection from "@blog/ui/components/commons/TItleSection";
import Textarea from "@blog/ui/components/commons/Textarea";

export default function Home() {
  return (
    <TitleSection title={"글자수 세기"}>
      <Textarea />
    </TitleSection>
  );
}
