import Header from "../header/Header";
import { PropsWithChildren } from "react";

export default function CrossView({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto w-full max-w-[1200px] relative px-4">
        {children}
      </div>
    </>
  );
}
