import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";

import CONFIG from "../../site.config";
import { TPosts } from "../../types";
import getPageProperties from "../../utils/notion/getPageProperties";

const maskPageId = (value?: string) => {
  if (!value) return "missing";
  if (value.length <= 12) return value;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
};

const isNotionDebugEnabled = process.env.NODE_ENV !== "production";

type RawCollectionResult = {
  blockIds?: string[];
  collection_group_results?: {
    blockIds?: string[];
  };
  reducerResults?: {
    blockIds?: string[];
    collection_group_results?: {
      blockIds?: string[];
    };
  };
};

const normalizeRecordEntries = <T extends Record<string, any>>(
  recordMap?: T,
) => {
  return Object.fromEntries(
    Object.entries(recordMap || {}).map(([key, entry]: [string, any]) => {
      if (entry?.value?.value) {
        return [
          key,
          {
            ...entry,
            role: entry?.value?.role ?? entry?.role,
            value: entry.value.value,
          },
        ];
      }

      return [key, entry];
    }),
  ) as T;
};

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async (): Promise<TPosts> => {
  let id = CONFIG.notionConfig.pageId as string;
  const configuredViewId = CONFIG.notionConfig.viewId as string | undefined;
  const originalId = id;
  const api = new NotionAPI();

  if (!id) {
    console.error("[notion:getPosts] NOTION_PAGE_ID is missing");
    throw new Error("NOTION_PAGE_ID is missing");
  }

  try {
    if (isNotionDebugEnabled) {
      console.info("[notion:getPosts] fetching page", {
        pageId: maskPageId(originalId),
      });
    }

    const pageChunk: any = await api.getPageRaw(id);
    const response: any = {
      ...(pageChunk?.recordMap || {}),
    };
    id = idToUuid(id);

    response.block = normalizeRecordEntries(response.block);
    response.collection = normalizeRecordEntries(response.collection);
    response.collection_view = normalizeRecordEntries(response.collection_view);
    response.notion_user = normalizeRecordEntries(response.notion_user);

    const collectionViewBlock =
      response.block?.[id]?.value || response.block?.[originalId]?.value;
    const collectionId =
      collectionViewBlock?.collection_id ||
      collectionViewBlock?.format?.collection_pointer?.id ||
      Object.keys(response.collection || {})[0];
    const resolvedViewId =
      (configuredViewId && idToUuid(configuredViewId)) ||
      collectionViewBlock?.view_ids?.[0] ||
      Object.keys(response.collection_view || {})[0] ||
      Object.keys(response.collection_query?.[collectionId] || {})[0];

    let viewBlockIds: string[] = [];
    if (collectionId && resolvedViewId) {
      const collectionData = await api.getCollectionData(
        collectionId,
        resolvedViewId,
        response.collection_view?.[resolvedViewId]?.value,
      );
      const collectionResult = collectionData?.result as
        | RawCollectionResult
        | undefined;

      response.block = {
        ...response.block,
        ...normalizeRecordEntries(collectionData?.recordMap?.block),
      };
      response.collection = {
        ...response.collection,
        ...normalizeRecordEntries(collectionData?.recordMap?.collection),
      };
      response.collection_view = {
        ...response.collection_view,
        ...normalizeRecordEntries(collectionData?.recordMap?.collection_view),
      };
      response.notion_user = {
        ...response.notion_user,
        ...normalizeRecordEntries(collectionData?.recordMap?.notion_user),
      };

      viewBlockIds =
        collectionResult?.reducerResults?.collection_group_results?.blockIds ||
        collectionResult?.collection_group_results?.blockIds ||
        collectionResult?.reducerResults?.blockIds ||
        collectionResult?.blockIds ||
        [];

      response.collection_query = {
        ...response.collection_query,
        [collectionId]: {
          ...response.collection_query?.[collectionId],
          [resolvedViewId]:
            collectionResult?.reducerResults || collectionData?.result,
        },
      };
    }

    const collection = response.collection?.[collectionId]?.value;
    const schema = collection?.schema;

    if (isNotionDebugEnabled) {
      console.info("[notion:getPosts] page fetched", {
        pageId: maskPageId(originalId),
        normalizedPageId: maskPageId(id),
        configuredViewId: maskPageId(configuredViewId),
        resolvedViewId: maskPageId(resolvedViewId),
        collectionCount: Object.keys(response.collection || {}).length,
        blockCount: Object.keys(response.block || {}).length,
        schemaKeys: Object.keys(schema || {}).length,
        collectionViewType:
          response.collection_view?.[resolvedViewId]?.value?.type ||
          collectionViewBlock?.type ||
          "missing",
        reducerBlockCount: viewBlockIds.length,
      });
    }

    if (!collectionId || !resolvedViewId) {
      console.warn("[notion:getPosts] collection info could not be resolved", {
        pageId: maskPageId(originalId),
        configuredViewId: maskPageId(configuredViewId),
      });
      return [];
    } else {
      // Construct Data
      const pageIds = viewBlockIds;
      const data = [];

      if (isNotionDebugEnabled) {
        console.info("[notion:getPosts] collection pages discovered", {
          pageId: maskPageId(originalId),
          resolvedViewId: maskPageId(resolvedViewId),
          pageCount: pageIds.length,
        });
      }

      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i];
        const properties =
          (await getPageProperties(id, response.block, schema)) || null;
        // Add fullwidth, createdtime to properties

        if (response.block[id] && properties) {
          properties.createdTime = new Date(
            response.block[id].value?.created_time,
          ).toString();
          properties.fullWidth =
            (response.block[id].value?.format as any)?.page_full_width ?? false;

          data.push(properties);
        } else {
          console.warn(
            "[notion:getPosts] skipped page without block or properties",
            {
              pageId: maskPageId(`${id}`),
            },
          );
        }
      }

      // Sort by date
      data.sort((a: any, b: any) => {
        const dateA: any = new Date(a?.date?.start_date || a.createdTime);
        const dateB: any = new Date(b?.date?.start_date || b.createdTime);
        return dateB - dateA;
      });

      const posts = data as TPosts;

      if (isNotionDebugEnabled) {
        console.info("[notion:getPosts] posts parsed", {
          pageId: maskPageId(originalId),
          parsedCount: posts.length,
          sampleSlugs: posts
            .slice(0, 5)
            .map((post) => post.slug || "(missing)"),
        });
      }

      return posts;
    }
  } catch (error) {
    console.error("[notion:getPosts] failed", {
      pageId: maskPageId(originalId),
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
};
