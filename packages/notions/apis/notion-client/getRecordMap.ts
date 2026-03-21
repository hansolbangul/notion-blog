import { unstable_cache } from "next/cache"
import { NotionAPI } from "notion-client"
import { NOTION_DETAIL_REVALIDATE_SECONDS } from "../../constants"
import { retryNotionRequest } from "./retryNotionRequest"

const isNotionDebugEnabled = process.env.NODE_ENV !== "production"
const RECORD_MAP_CACHE_TTL = NOTION_DETAIL_REVALIDATE_SECONDS * 1000

export const NOTION_RECORD_MAP_CACHE_TAG = "notion-record-map"
const RUNTIME_RECORD_MAP_REVALIDATE_SECONDS =
  NOTION_DETAIL_REVALIDATE_SECONDS + 300

type RecordMapCacheEntry = {
  expiresAt: number
  promise: Promise<any> | null
  value: any
}

const recordMapCache = new Map<string, RecordMapCacheEntry>()

function getRuntimeCachedRecordMap(pageId: string) {
  const getCachedRecordMap = unstable_cache(
    async (cachedPageId: string) => {
      const api = new NotionAPI()

      if (isNotionDebugEnabled) {
        console.info("[notion:getRecordMap] fetching detail page", {
          pageId: cachedPageId,
        })
      }

      const recordMap = await retryNotionRequest(
        () => api.getPage(cachedPageId),
        "getRecordMap:getPage",
      )

      if (isNotionDebugEnabled) {
        console.info("[notion:getRecordMap] detail page fetched", {
          pageId: cachedPageId,
          blockCount: Object.keys(recordMap?.block || {}).length,
          collectionCount: Object.keys(recordMap?.collection || {}).length,
        })
      }

      return recordMap
    },
    ["notion-record-map"],
    {
      revalidate: RUNTIME_RECORD_MAP_REVALIDATE_SECONDS,
      tags: [NOTION_RECORD_MAP_CACHE_TAG],
    },
  )

  return getCachedRecordMap(pageId)
}

export function clearNotionRecordMapCache(pageId?: string) {
  if (pageId) {
    recordMapCache.delete(pageId)
    return
  }

  recordMapCache.clear()
}

export const getRecordMap = async (pageId: string) => {
  const cached = recordMapCache.get(pageId)
  if (cached?.value && cached.expiresAt > Date.now()) {
    if (isNotionDebugEnabled) {
      console.info("[notion:getRecordMap] cache hit", {
        pageId,
      })
    }
    return cached.value
  }

  if (cached?.promise) {
    if (isNotionDebugEnabled) {
      console.info("[notion:getRecordMap] awaiting in-flight request", {
        pageId,
      })
    }
    return cached.promise
  }

  const staleRecordMap = cached?.value ?? null
  const request = (async () => {
    try {
      return await getRuntimeCachedRecordMap(pageId)
    } catch (error) {
      console.error("[notion:getRecordMap] failed", {
        pageId,
        message: error instanceof Error ? error.message : String(error),
      })

      if (staleRecordMap) {
        console.warn("[notion:getRecordMap] serving stale recordMap", {
          pageId,
        })
        return staleRecordMap
      }

      throw error
    }
  })()

  recordMapCache.set(pageId, {
    expiresAt: 0,
    promise: request,
    value: null,
  })

  try {
    const recordMap = await request
    recordMapCache.set(pageId, {
      expiresAt: Date.now() + RECORD_MAP_CACHE_TTL,
      promise: null,
      value: recordMap,
    })
    return recordMap
  } catch (error) {
    recordMapCache.delete(pageId)
    throw error
  }
}
