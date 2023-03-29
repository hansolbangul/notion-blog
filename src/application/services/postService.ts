import PostApiService from "@/networks/postAPIService";

export default class PostService {
  private _postApiService: PostApiService;
  constructor() {
    this._postApiService = new PostApiService();
  }

  async init() {
    return await this._postApiService.init();
  }

  getPost() {
    const pageAllId = this._postApiService.getPageAllId();
    pageAllId.forEach((item) => {
      this._postApiService.getPageProperties(item);
    });

    return;
  }
}
