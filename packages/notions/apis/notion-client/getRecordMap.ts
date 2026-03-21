import { NotionAPI } from "notion-client"
import { NOTION_REVALIDATE_SECONDS } from "../../constants"
import { retryNotionRequest } from "./retryNotionRequest"

const isNotionDebugEnabled = process.env.NODE_ENV !== "production"
const RECORD_MAP_CACHE_TTL = NOTION_REVALIDATE_SECONDS * 1000

type RecordMapCacheEntry = {
  expiresAt: number
  promise: Promise<any> | null
  value: any
}

const recordMapCache = new Map<string, RecordMapCacheEntry>()

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

  const api = new NotionAPI()
  const request = (async () => {
    try {
      if (isNotionDebugEnabled) {
        console.info("[notion:getRecordMap] fetching detail page", {
          pageId,
        })
      }
      const recordMap = await retryNotionRequest(
        () => api.getPage(pageId),
        "getRecordMap:getPage",
      )
      if (isNotionDebugEnabled) {
        console.info("[notion:getRecordMap] detail page fetched", {
          pageId,
          blockCount: Object.keys(recordMap?.block || {}).length,
          collectionCount: Object.keys(recordMap?.collection || {}).length,
        })
      }
      return recordMap
    } catch (error) {
      console.error("[notion:getRecordMap] failed", {
        pageId,
        message: error instanceof Error ? error.message : String(error),
      })
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
