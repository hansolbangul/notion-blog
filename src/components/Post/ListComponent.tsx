import React from "react";
import Link from "next/link";
import { Author, TPost, TPostType } from "@/src/types";
import ImageWithFallback from "../Common/ImageWithFallback";

type Props = {
  post: TPost;
};

function Thumbnail(props: { thumbnail: string }) {
  const { thumbnail } = props;

  return (
    <div className="relative rounded-xl aspect-[340/190] min-w-max w-full h-fit overflow-hidden self-center flex-auto sm:flex-1">
      <ImageWithFallback alt="thumbnail" src={thumbnail} fill style={{ objectFit: "cover" }} />
    </div>
  );
}

function Profile(props: { authorName: string; profile: string; date: string }) {
  const { authorName, profile, date } = props;

  return (
    <div className="w-full flex gap-2 items-center p-4 bg-slate-50 rounded-lg h-[64px]">
      <ImageWithFallback
        alt="profile"
        className="rounded-xl object-cover aspect-square"
        src={profile ?? ""}
        width={44}
        height={44}
      />
      <div className="h-full flex flex-col justify-between">
        <div className="text-sm">{authorName}</div>
        <div className="text-xs">{date}</div>
      </div>
    </div>
  );
}

function Contents(props: { title: string; summary?: string }) {
  const { title, summary } = props;

  return (
    <div className="p-2 w-full flex gap-4 flex-col">
      <div className="w-full text-base mt-4 truncate">{title}</div>
      <div className="w-full text-sm truncate">{summary}</div>
    </div>
  );
}

export default function ListComponent({ post }: Props) {
  const { title, type: types, thumbnail = "", author: authors, summary, tags, date } = post;
  const { start_date } = date;

  const [author] = authors ?? [];
  const [type] = types;
  const href = `/${type.toLocaleLowerCase()}/${post.slug}`;

  return (
    <Link
      className="p-2 h-full flex flex-wrap gap-2 bg-white shadow-[0_0_32px_0_rgba(0,0,0,0.07)] rounded-xl overflow-hidden"
      href={href}
    >
      <Thumbnail thumbnail={thumbnail} />
      <div className="w-full flex-1 flex-shrink flex flex-col justify-between min-w-0">
        <Contents title={title} summary={summary} />
        <Profile authorName={author.name} profile={author.profile_photo ?? ""} date={start_date} />
      </div>
    </Link>
  );
}
