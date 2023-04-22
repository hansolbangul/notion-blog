import { Block, BlockMap, ExtendedRecordMap, ID, CollectionPropertySchemaMap } from "notion-types";
import { Post } from "@/application/domain/post";
import { NotionAPI } from "notion-client";
import { getDateValue, getTextContent, idToUuid } from "notion-utils";

export default class PostApiService {
  private readonly PAGE_ID = process.env.NOTION_PAGE_ID as string;
  private readonly V_ID = process.env.V_ID as string;
  private readonly api = new NotionAPI();
  id: string | undefined;
  block: BlockMap | undefined;
  schema: CollectionPropertySchemaMap | undefined;
  rawMetadata: Block | undefined;
  notionRes: ExtendedRecordMap | undefined;

  async init(): Promise<boolean> {
    this.notionRes = await this.api.getPage(this.PAGE_ID);
    const collection = Object.values(this.notionRes.collection)[0]?.value;
    this.id = idToUuid(this.PAGE_ID);
    this.block = this.notionRes.block;
    this.schema = collection?.schema;
    this.rawMetadata = this.block[this.id].value;

    return true;
  }

  getPageAllId(): string[] {
    if (!this.notionRes) throw Error("init()을 먼저 실행해주세요.");
    const collectionQuery = this.notionRes.collection_query;
    const views = Object.values(collectionQuery)[0];

    const pageSet = new Set<ID>();
    Object.values(views).forEach((view) => {
      view.collection_group_results?.blockIds?.forEach((id: string) => pageSet.add(id));
    });

    return Array.from(pageSet);
  }

  async setPageProperties(id: string): Promise<Post> {
    if (!this.notionRes) throw Error("init()을 먼저 실행해주세요.");
    const schema = this.schema as CollectionPropertySchemaMap;
    const block = this.block as BlockMap;

    const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
    const excludeProperties = ["date", "select", "multi_select", "person", "file"];
    const properties: any = {};

    for (let i = 0; i < rawProperties.length; i++) {
      const [key, val]: any = rawProperties[i];
      properties.id = id;
      if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
        properties[schema[key].name] = getTextContent(val);
      } else {
        switch (schema[key]?.type) {
          case "file": {
            try {
              const Block = block?.[id].value;
              const url: string = val[0][1][0][1];
              const newurl = this.customMapImageUrl(url, Block);
              properties[schema[key].name] = newurl;
            } catch (error) {
              properties[schema[key].name] = undefined;
            }
            break;
          }
          case "date": {
            const dateProperty: any = getDateValue(val);
            delete dateProperty.type;
            properties[schema[key].name] = dateProperty;
            break;
          }
          case "select": {
            const selects = getTextContent(val);
            if (selects[0]?.length) {
              properties[schema[key].name] = selects.split(",");
            }
            break;
          }
          case "multi_select": {
            const selects = getTextContent(val);
            if (selects[0]?.length) {
              properties[schema[key].name] = selects.split(",");
            }
            break;
          }
          case "person": {
            const rawUsers = val.flat();

            const users = [];
            for (let i = 0; i < rawUsers.length; i++) {
              if (rawUsers[i][0][1]) {
                const userId = rawUsers[i][0];
                const res: any = await this.api.getUsers(userId);
                const resValue = res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
                const user = {
                  id: resValue?.id,
                  name: resValue?.name || `${resValue?.family_name}${resValue?.given_name}` || undefined,
                  profile_photo: resValue?.profile_photo || null,
                };
                users.push(user);
              }
            }
            properties[schema[key].name] = users;
            break;
          }
          default:
            break;
        }
      }
    }
    return properties;
  }

  async getPostBlocks(id: string) {
    const pageBlock = await this.api.getPage(id);
    return pageBlock;
  }

  customMapImageUrl = (url: string, block: Block): string => {
    if (!url) {
      throw new Error("URL can't be empty");
    }

    if (url.startsWith("data:")) {
      return url;
    }

    if (url.startsWith("https://images.unsplash.com")) {
      return url;
    }

    try {
      const u = new URL(url);

      if (u.pathname.startsWith("/secure.notion-static.com") && u.hostname.endsWith(".amazonaws.com")) {
        if (
          u.searchParams.has("X-Amz-Credential") &&
          u.searchParams.has("X-Amz-Signature") &&
          u.searchParams.has("X-Amz-Algorithm")
        ) {
          url = u.origin + u.pathname;
        }
      }
    } catch {
      // ignore invalid urls
    }

    if (url.startsWith("/images")) {
      url = `https://www.notion.so${url}`;
    }

    url = `https://www.notion.so${url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`}`;

    const notionImageUrlV2 = new URL(url);
    let table = block.parent_table === "space" ? "block" : block.parent_table;
    if (table === "collection" || table === "team") {
      table = "block";
    }
    notionImageUrlV2.searchParams.set("table", table);
    notionImageUrlV2.searchParams.set("id", block.id);
    notionImageUrlV2.searchParams.set("cache", "v2");

    url = notionImageUrlV2.toString();

    return url;
  };
}
