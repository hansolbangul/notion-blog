import { ReqLetterListType } from "@/service/letterService/type";
import letterService from "@/service/letterService/service";
import { databases } from "@/app/appwrite";

const queries = {
  all: ["letter"] as const,
  list: ({ offset = 0, limit = 10 }: ReqLetterListType) =>
    [...queries.all, offset, limit] as const,
  detail: ({ id }: { id: string }) => [...queries.all, id] as const,
};

const letterDatabase = process.env.NEXT_PUBLIC_LETTER_DATABASE_ID as string;
const commentCollections = process.env.NEXT_PUBLIC_LETTER_DATABASE_ID as string;

export const LetterQueryOptions = {
  list: (props: ReqLetterListType) => ({
    queryKey: queries.list(props),
    queryFn: () =>
      databases.listDocuments(
        letterDatabase,
        commentCollections,
        letterService.getLetters(props),
      ),
  }),

  detail: (props: { id: string }) => ({
    queryKey: queries.detail(props),
    queryFn: () =>
      databases.listDocuments(
        letterDatabase,
        commentCollections,
        letterService.getLetterDetail(props),
      ),
  }),
};
