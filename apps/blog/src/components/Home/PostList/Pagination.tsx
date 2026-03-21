"use client";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const firstPageInWindow = Math.max(1, currentPage - 2);
  const lastPageInWindow = Math.min(totalPages, firstPageInWindow + 4);
  const adjustedStart = Math.max(1, lastPageInWindow - 4);

  const pages = Array.from(
    { length: lastPageInWindow - adjustedStart + 1 },
    (_, index) => adjustedStart + index,
  );

  const buttonClass =
    "min-w-[44px] border px-3 py-2 text-body13 transition disabled:cursor-not-allowed disabled:opacity-40";
  const inactiveClass =
    "border-line bg-paper-strong text-ink shadow-panel hover:border-accent hover:text-ink";
  const activeClass =
    "border-ink bg-ink !text-paper-strong shadow-[6px_6px_0_rgba(31,26,20,0.12)]";

  return (
    <nav
      aria-label="글 목록 페이지네이션"
      className="mt-10 flex flex-wrap items-center gap-2"
    >
      <button
        type="button"
        className={`${buttonClass} ${inactiveClass}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${buttonClass} ${
            page === currentPage ? activeClass : inactiveClass
          }`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={`${buttonClass} ${inactiveClass}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </nav>
  );
}
