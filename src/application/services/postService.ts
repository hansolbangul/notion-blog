import { Block, BlockMap, ExtendedRecordMap, ID, CollectionPropertySchemaMap } from "notion-types";
import PostApiService from "@/networks/postAPIService";
import { Post, PostStatus, PostType } from "../domain/post";

type GetFilterPostsReq = {
  options?: {
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

  async getFilterPosts({ options = { status: ["Public"], type: "Post" } }: GetFilterPostsReq) {
    const { status, type } = options;
    const current = new Date();
    const tomorrow = new Date(current);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const posts = await this.getAllPost();
    const filterPosts = posts
      // filter data
      .filter((post) => {
        const postDate = new Date(post?.date?.start_date || post.createdTime);
        if (!post.title || !post.slug || postDate > tomorrow) return false;
        return true;
      })
      // filter status
      .filter((post) => {
        const postStatus = post.status[0];
        return status.includes(postStatus);
      })
      // filter type
      .filter((post) => {
        const postType = post.type[0];
        return type.includes(postType);
      })
      .map((post) => new Post(post));
    return filterPosts;
  }

  async getPostBlock(id: string) {
    return this._postApiService.getPostBlocks(id);
  }
}
