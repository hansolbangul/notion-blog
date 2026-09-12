import assert from "node:assert/strict";
import test from "node:test";
import { NotionAPI as BaseNotionAPI } from "notion-client";
import { NotionAPI, normalizeNotionResponse } from "./client.ts";

test("normalizes nested records while preserving legacy records and metadata", () => {
  const block = { id: "page", type: "page", content: ["child"] };
  const response = {
    recordMap: {
      __version__: 3,
      block: {
        page: { value: { role: "reader", value: block } },
        child: { role: "reader", value: { id: "child", type: "text" } },
      },
      collection: { db: { value: { value: { schema: { title: {} } } } } },
    },
    recordMapWithRoles: { notion_user: { user: { value: { value: { name: "Author" } } } } },
  };
  normalizeNotionResponse(response);
  assert.equal(response.recordMap.block.page.value, block);
  assert.equal(response.recordMap.block.page.role, "reader");
  assert.equal(response.recordMap.block.child.value.type, "text");
  assert.deepEqual(response.recordMap.collection.db.value.schema, { title: {} });
  assert.equal(response.recordMapWithRoles.notion_user.user.value.name, "Author");
  assert.equal(response.recordMap.__version__, 3);
  assert.equal(normalizeNotionResponse(response), response);
});

test("all Notion endpoints receive identification and normalized responses", async () => {
  const original = BaseNotionAPI.prototype.fetch;
  const calls = [];
  BaseNotionAPI.prototype.fetch = async function (options) {
    calls.push(options);
    return { recordMap: { block: { page: { value: { value: { id: "page" } } } } } };
  };
  try {
    const api = new NotionAPI();
    for (const endpoint of ["loadPageChunk", "queryCollection", "syncRecordValues", "getRecordValues", "getSignedFileUrls"]) {
      const response = await api.fetch({ endpoint, body: {}, gotOptions: { headers: { "x-test": "preserved" } } });
      assert.equal(response.recordMap.block.page.value.id, "page");
    }
    for (const options of calls) {
      assert.match(options.gotOptions.headers["user-agent"], /bangul-log/);
      assert.equal(options.gotOptions.headers["x-test"], "preserved");
      assert.equal(options.gotOptions.timeout.request, 30000);
    }
  } finally {
    BaseNotionAPI.prototype.fetch = original;
  }
});
