/** A stable Korean calendar date on both the server and the reader's device. */
export function formatPostDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value.replaceAll("-", ".");
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return "";
  return new Date(timestamp + 9 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", ".");
}
