import React from "react";
import Header from "@/app/(feature)/header/Header";

export default function HeaderTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
