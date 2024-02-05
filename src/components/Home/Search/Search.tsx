"use client";

export default function Search() {
  return (
    <input
      type="text"
      name="search-keyword-input"
      className="w-full sm:w-80 border-none bg-gray-100 rounded-md p-2 focus:outline-none place-self-center align-middle"
      placeholder="Search Keyword"
    />
  );
}
