import { TTags } from "./network";
import { DataNetworkService } from "./networkCore";

export default class TagApiService extends DataNetworkService {
  getAllTags(): TTags {
    const res = this._networkCore.get<TTags>();
    return res;
  }
}
