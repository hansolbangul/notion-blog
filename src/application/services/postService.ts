import { Block, BlockMap, ExtendedRecordMap, ID, CollectionPropertySchemaMap } from "notion-types";
import PostApiService from "@/networks/postAPIService";
import { Post, PostStatus, PostType } from "../domain/post";

type GetFilterPostsReq = {
  options: {
    status: PostStatus[];
    type: PostType;
  };
};
export default class PostService {
  private _postApiService: PostApiService;
  constructor() {
    this._postApiService = new PostApiService();
  }

  async init() {
    return await this._postApiService.init();
  }

  async getAllPost() {
    const service = this._postApiService;
    const blockValue = service.block as BlockMap;
    const pageAllId = service.getPageAllId();

    const data = [];

    for (let i = 0; i < pageAllId.length; i++) {
      const id = pageAllId[i];
      const properties = (await service.setPageProperties(id)) || null;
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(blockValue[id].value?.created_time).toString();
      properties.fullWidth = (blockValue[id].value?.format as any)?.page_full_width ?? false;

      data.push(properties);
    }

    // Sort by date
    data.sort((a, b) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime);
      const dateB: any = new Date(b?.date?.start_date || b.createdTime);
      return dateB - dateA;
    });
    return data.map((post) => new Post(post));
  }

  getFilterPosts({ options = { status: ["Public"], type: "Post" } }: GetFilterPostsReq) {}
}
