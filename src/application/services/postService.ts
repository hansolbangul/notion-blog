import PostApiService from "@/src/networks/postAPIService";

export default class PostService {
  private _postApiService: PostApiService;
  constructor() {
    this._postApiService = new PostApiService();
  }

  getAllPost() {
    return this._postApiService.getAllPost();
  }
}
