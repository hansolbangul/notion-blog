import type { TPost } from "@blog/notions/types";

const WORDS_PER_MINUTE = 220;
const KOREAN_CHARACTERS_PER_MINUTE = 500;

function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function countCharacters(text: string) {
  return text.replace(/\s+/g, "").length;
}

export function getEstimatedReadingMinutes(text: string) {
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (!normalizedText) return 1;

  const wordMinutes = countWords(normalizedText) / WORDS_PER_MINUTE;
  const characterMinutes =
    countCharacters(normalizedText) / KOREAN_CHARACTERS_PER_MINUTE;

  return Math.max(1, Math.ceil(Math.max(wordMinutes, characterMinutes)));
}

export function getPostReadingMinutes(post: Pick<TPost, "title" | "summary">) {
  return getEstimatedReadingMinutes([post.title, post.summary].join(" "));
}
