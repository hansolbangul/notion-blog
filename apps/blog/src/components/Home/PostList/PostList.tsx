"use client";

import React, { useEffect, useRef, useState } from "react";
import ListComponent from "../../Post/ListComponent";
import { TPosts } from "@blog/notions/types";
import useRouterQuery from "@hook/useRouterQuery";
import Pagination from "./Pagination";

type Props = {
  search: string;
  posts: TPosts;
};

export default function PostList({ search, posts }: Props) {
  const PAGE_SIZE = 7;
  const params = useRouterQuery();
  const tagQuery = params.get("tag") || "All";
  const [filter, setFilter] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilter(() => {
      let filters = posts;

      filters = filters.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.summary?.toLowerCase().includes(search.toLowerCase()),
      );

      if (tagQuery !== "All") {
        filters = filters.filter(
          (post) => post && post.tags && post.tags.includes(tagQuery),
        );
      }

      return filters;
    });
  }, [tagQuery, search, posts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tagQuery, search]);

  const totalPages = Math.max(1, Math.ceil(filter.length / PAGE_SIZE));
  const normalizedCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = filter.slice(
    (normalizedCurrentPage - 1) * PAGE_SIZE,
    normalizedCurrentPage * PAGE_SIZE,
  );

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={listTopRef}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
            archive
          </p>
          <h3 className="font-display text-[24px] text-ink">
            {tagQuery === "All" ? "전체 글" : `${tagQuery} 글 모음`}
          </h3>
        </div>
        <span className="text-body13 text-ink-soft">
          {filter.length}개의 글
        </span>
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          {paginatedPosts.map((post) => (
            <ListComponent key={post.id} post={post} />
          ))}
          <Pagination
            currentPage={normalizedCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="border border-line bg-paper-strong px-6 py-10 text-body14 text-ink-soft">
          검색 결과가 없습니다. 다른 키워드로 찾아보세요.
        </div>
      )}
    </section>
  );
}
