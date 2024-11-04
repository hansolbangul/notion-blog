import type { Metadata } from "next";
import "./globals.css";
import NextQueryProvider from "@/app/NextQueryProvider";
import Header from "@/app/(components)/layout/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-gray-900 text-gray-300"}>
        <div id="modal-root" className="fixed z-30" />
        <NextQueryProvider>
          <div className="mx-auto w-full max-w-[1200px] relative px-4">
            <Header />
            {children}
          </div>
        </NextQueryProvider>
      </body>
    </html>
  );
}