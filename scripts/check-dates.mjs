import assert from "node:assert/strict";
import { formatPostDate } from "../apps/blog/src/libs/date.ts";
for (const zone of ["UTC", "Asia/Seoul", "America/Los_Angeles"]) {
  process.env.TZ = zone;
  assert.equal(formatPostDate("2026-09-13"), "2026.09.13");
  assert.equal(formatPostDate("2026-09-12T16:00:00Z"), "2026.09.13");
  assert.equal(formatPostDate("2026-09-13T00:00:00+09:00"), "2026.09.13");
  assert.equal(formatPostDate("invalid"), "");
}
console.log("Post dates are identical across UTC, Seoul and Los Angeles.");
