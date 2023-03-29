import {
  Block,
  BlockMap,
  ExtendedRecordMap,
  ID,
  CollectionPropertySchemaMap,
} from "notion-types";
import { Post } from "@/application/domain/post";
import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";

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
      view.collection_group_results?.blockIds?.forEach((id: string) =>
        pageSet.add(id)
      );
    });

    return Array.from(pageSet);
  }

  async getPageProperties(id: string) {
    const rawProperties = Object.entries(
      this.block?.[id]?.value?.properties || []
    );
    console.log(rawProperties);

    // const excludeProperties = ['date', 'select', 'multi_select', 'person', 'file']
  }

  async getPost() {
    // console.log(block);
    // console.log(schema);
    // console.log(rawMetadata);
  }
}
