export function textLength(value: string) {
  return value.length;
}

export function textLengthWithoutSpaces(value: string) {
  return value.replaceAll(" ", "").replaceAll("\n", "").length;
}

export function textParagraphLength(value: string) {
  if (!value) return 0;
  return value.trim().split(/\r?\n+/).length;
}
