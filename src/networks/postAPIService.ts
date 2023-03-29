import { getPosts } from "../libs/notion";
import { TPosts } from "./network";
import { DataNetworkService } from "./networkCore";

export default class PostApiService extends DataNetworkService {
  async getAllPost(): Promise<TPosts> {
    const res = await getPosts();
    return res;
  }
}
