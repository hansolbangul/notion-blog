import { HeaderLayout } from "@app/(component)/header/HeaderLayout";
import ClientHeader from "@app/(component)/header/ClientHeader";

export default async function Header() {
  return (
    <HeaderLayout>
      <ClientHeader />
    </HeaderLayout>
  );
}
