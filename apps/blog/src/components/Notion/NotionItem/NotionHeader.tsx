"use client";

import TagIcon from "@components/Post/PostItem/TagIcon";
import Toast from "@components/Toast/Toast";
import React, { Suspense, useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { TPost } from "@blog/notions/types";
import { usePathname } from "next/navigation";

type Props = {
  post: TPost;
};

export default function NotionHeader({ post }: Props) {
  const pathName = usePathname();

  const isPostSlug = pathName.startsWith("/post");

  if (!isPostSlug) return null;
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const copyUrl = async () => {
    if (visible) return;
    const href = window.location.href;
    const clipboard = await navigator.clipboard.readText();

    if (clipboard === href) {
      setTime("이미 저장하였습니다.");
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setTime("클립보드에 저장하였습니다.");
      } catch {
        setTime("클립보드에 저장 실패하였습니다.");
      }
    }
  };

  const setTime = (message: string) => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
    setMessage(message);
    setVisible(true);
  };

  return (
    <div className="flex flex-col py-6 md:py-7 border-y">
      <h1 className="inline-block bg-clip-text bg-gradient-to-tr to-indigo-300 from-indigo-600 text-3xl md:text-5xl font-bold text-transparent tracking-tight max-w-2xl">
        {post.title}
      </h1>
      <div className="pt-6 flex space-x-4 text-base items-center">
        <div className="flex flex-col space-y-1">
          <span className="font-normal">생성일</span>
          <span className="font-bold">
            {new Intl.DateTimeFormat("ko").format(
              new Date(post.date.start_date),
            )}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-normal">태그</span>
          <span className="flex space-x-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <Suspense key={tag}>
                <TagIcon isRouter={false} key={tag} tag={tag} />
              </Suspense>
            ))}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-normal">작성자</span>
          <span className="font-bold">
            {post.author ? post.author[0].name : "미등록"}
          </span>
        </div>
        <div className="flex flex-auto justify-end cursor-pointer">
          <IoShareSocialSharp onClick={copyUrl} />
        </div>
      </div>
      {visible && <Toast message={message} />}
    </div>
  );
}
