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
    <div className="flex flex-col gap-8 border-y border-line py-8 md:py-10">
      <h1 className="inline-block max-w-3xl font-display text-[38px] leading-[1.08] text-ink custom:text-[52px]">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-end gap-6 pt-2 text-base">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-editorial text-ink-soft">
            생성일
          </span>
          <span className="font-medium text-ink">
            {new Intl.DateTimeFormat("ko").format(
              new Date(post.date.start_date),
            )}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-editorial text-ink-soft">
            태그
          </span>
          <span className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <Suspense key={tag}>
                <TagIcon isRouter={false} key={tag} tag={tag} />
              </Suspense>
            ))}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-editorial text-ink-soft">
            작성자
          </span>
          <span className="font-medium text-ink">
            {post.author ? post.author[0].name : "미등록"}
          </span>
        </div>
        <button
          onClick={copyUrl}
          className="ml-auto flex h-11 w-11 items-center justify-center border border-line bg-paper-strong text-lg text-ink shadow-panel"
          type="button"
          aria-label="현재 글 주소 복사"
        >
          <IoShareSocialSharp />
        </button>
      </div>
      {visible && <Toast message={message} />}
    </div>
  );
}
