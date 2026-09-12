import { NotionAPI as BaseNotionAPI } from "notion-client";

// Notion now wraps some records in a second { role, value } envelope.
// Normalize at the transport boundary so getPage can traverse child blocks too.
export function normalizeNotionResponse<T>(response: T): T {
  const result = response as any;
  for (const map of [result?.recordMap, result?.recordMapWithRoles]) {
    for (const table of Object.values(map || {})) {
      if (!table || typeof table !== "object") continue;
      for (const entry of Object.values(table)) {
        if (entry?.value?.value) {
          entry.role = entry.value.role ?? entry.role;
          entry.value = entry.value.value;
        }
      }
    }
  }
  return response;
}

export class NotionAPI extends BaseNotionAPI {
  async fetch<T>(options: Parameters<BaseNotionAPI["fetch"]>[0]): Promise<T> {
    const response = await super.fetch<T>({
      ...options,
      gotOptions: {
        ...options.gotOptions,
        timeout: { request: 30_000 },
        headers: {
          ...options.gotOptions?.headers,
          "user-agent": "bangul-log/1.0 (+https://hansolbangul.com)",
        },
      },
    });
    return normalizeNotionResponse(response);
  }
}
