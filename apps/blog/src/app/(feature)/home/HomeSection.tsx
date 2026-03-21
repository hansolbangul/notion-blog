"use client";

import React, { Suspense, useCallback, useState } from "react";
import PostList from "@components/Home/PostList/PostList";
import Search from "@components/Home/Search/Search";
import TagList from "@app/(component)/commons/TagList";
import { TPosts } from "@blog/notions/types";

interface Props {
  posts: TPosts;
  tags: string[];
}

export default function HomeSection({ posts, tags }: Props) {
  const [search, setSearch] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  }, []);

  return (
    <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
      <div className="relative flex w-full max-w-[820px] flex-col gap-6">
        <section className="border border-line bg-paper-strong p-5 shadow-panel">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
                archive search
              </p>
              <h2 className="font-display text-[28px] leading-[1.12] text-ink sm:text-[34px]">
                찾고 싶은 글을 바로 골라보세요
              </h2>
              <p className="max-w-2xl text-body14 leading-7 text-ink-soft">
                최근 기록부터 차근차근 넘겨볼 수도 있고, 키워드나 태그로 원하는
                글만 빠르게 골라볼 수도 있어요.
              </p>
            </div>
            <Search onChange={onChange} value={search} />
          </div>
        </section>
        <Suspense>
          <PostList search={search} posts={posts} />
        </Suspense>
      </div>
      <aside className="hidden custom:flex custom:w-[280px] custom:flex-col custom:self-start custom:border custom:border-line custom:bg-paper-strong custom:p-5 custom:shadow-panel">
        <Suspense>
          <TagList tags={tags} />
        </Suspense>
      </aside>
    </div>
  );
}
