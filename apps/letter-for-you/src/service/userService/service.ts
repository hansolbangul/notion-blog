import { Query } from "appwrite";
import { ReqLetterListType } from "@/service/letterService/type";

const letterService = {
  getLetters: ({ limit = 10, offset = 0 }: ReqLetterListType) => [
    Query.limit(limit),
    Query.offset(limit),
  ],

  getLetterDetail: ({ id }: { id: string }) => [Query.equal("id", [id])],
};

export default letterService;
