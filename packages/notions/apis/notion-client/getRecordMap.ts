import { NotionAPI } from "notion-client"
import { retryNotionRequest } from "./retryNotionRequest"

const isNotionDebugEnabled = process.env.NODE_ENV !== "production"

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
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
}
