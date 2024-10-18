"use client";

import { databases } from "@/app/appwrite";
import Confetti from "@blog/ui/components/layouts/Confetti";

export default function Test() {
  const data = databases
    .listDocuments(
      process.env.NEXT_PUBLIC_LETTER_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_COMMENT_COLLECTIONS_ID as string,
    )
    .then((res) => {
      console.log("res", res);
    });

  console.log("data", data);
  return <div>{/*<Confetti />*/}</div>;
}
