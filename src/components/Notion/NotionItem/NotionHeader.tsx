"use client";

import TagIcon from "@/components/Post/PostItem/TagIcon";
import { TPost } from "@/networks/network";
import React from "react";
import { IoShareSocialSharp } from "react-icons/io5";

type Props = {
  post: TPost;
};

export default function NotionHeader({ post }: Props) {
  return (
    <div className="flex flex-col py-7 border-y">
      <h1 className="font-bold text-transparent tracking-tight max-w-2xl text-5xl">
        <span className="inline-block bg-clip-text bg-gradient-to-tr to-indigo-300 from-indigo-600">{post.title}</span>
      </h1>
      <div className="pt-6 flex space-x-4 text-base items-center">
        <div className="flex flex-col space-y-1">
          <span className="font-normal">생성일</span>
          <span className="font-bold">{new Intl.DateTimeFormat("ko").format(new Date(post.date.start_date))}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-normal">태그</span>
          <span className="flex space-x-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <TagIcon isRouter={false} key={tag} tag={tag} />
            ))}
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-normal">작성자</span>
          <span className="font-bold">{post.author ? post.author[0].name : "미등록"}</span>
        </div>
        <div className="flex flex-auto justify-end cursor-pointer">
          <IoShareSocialSharp />
        </div>
      </div>
    </div>
  );
}
