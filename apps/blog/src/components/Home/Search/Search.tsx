"use client";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Search({ value, onChange }: Props) {
  return (
    <div className="mb-4 w-full pt-3">
      <input
        type="text"
        className="text-body14 text-gray-400 border border-gray-400 rounded-2xl w-full py-2 px-3 flex-auto"
        placeholder="Search Keyword"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
