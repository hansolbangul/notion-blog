"use client";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Search({ value, onChange }: Props) {
  return (
    <div className="mb-5 w-full">
      <label
        htmlFor="archive-search"
        className="mb-2 block text-[11px] uppercase tracking-editorial text-ink-soft"
      >
        search archive
      </label>
      <input
        id="archive-search"
        type="text"
        className="flex-auto w-full border border-line bg-white/70 px-4 py-3 text-body14 text-ink outline-none ring-0 placeholder:text-ink-soft focus:border-accent"
        placeholder="검색어로 기록 찾기"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
