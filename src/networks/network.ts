import {
  Block,
  BlockMap,
  ExtendedRecordMap,
  ID,
  CollectionPropertySchemaMap,
} from "notion-types";

export type TPostStstus = "Private" | "Public" | "PublicOnDetail";
export type TPostType = "Post" | "Paper" | "Page";

export type TPost = {
  id: string;
  date: { start_date: string };
  type: TPostType[];
  slug: string;
  tags?: string[];
  summary?: string;
  author?: {
    id: string;
    name: string;
    profile_photo?: string;
  }[];
  title: string;
  status: TPostStstus[];
  createdTime: string;
  fullWidth: boolean;
  thumbnail?: string;
};

export type TPosts = TPost[];

export type TTags = {
  [tagName: string]: number;
};

export type ThemeType = "dark" | "light";

export type NotionBlock = Block;

export type NotionBlockMap = BlockMap;

export type NotionExtendedRecordMap = ExtendedRecordMap;

export type NotionId = ID;

export type NotionCollectionPropertySchemaMap = CollectionPropertySchemaMap;

//

export type LoginReq = {};
export type LoginRes = {
  accessToken: string;
};

export type LogoutReq = {};
export type LogoutRes = {};

export type ReIssueReq = {};
export type ReIssueRes = {};

export type DeleteUserReq = {};
export type DeleteUserRes = {};

export type ReportUserReq = {};
export type ReportUserRes = {};

export type BlockUserReq = {};
export type BlockUserRes = {};

export type CheckCharacterExistReq = {};
export type CheckCharacterExistRes = {};

export type CreateWorldReq = {};
export type CreateWorldRes = {};

export type GetWorldListReq = {};
export type GetWorldListRes = {};

export type GetAllWorldListReq = {};
export type GetAllWorldListRes = {};

export type DeleteWorldReq = {};
export type DeleteWorldRes = {};

export type PutWorldInfoReq = {};
export type PutWorldInfoRes = {};

export type PostWorldImgReq = {};
export type PostWorldImgRes = {};

export type GetWorldInfoReq = {};
export type GetWorldInfoRes = {};

export type SearchWorldReq = {};
export type SearchWorldRes = {};

export type GetUserCharactersReq = {};
export type GetUserCharacterRes = {};

export type ParticipateWorldReq = {};
export type ParticipateWorldRes = {};

export type AddCharacterReq = {};
export type AddCharacterRes = {};

export type GetRecommendedWorldReq = {};
export type GetRecommendedWorldRes = {};

export type PostCharacterImgReq = {};
export type PostCharacterImgRes = {};

export type PutCharacterInfoReq = {};
export type PutCharacterInfoRes = {};

export type GetCharacterInfoReq = {};
export type GetCharacterInfoRes = {};

export type GetProgressReq = {};
export type GetProgressRes = {};

export type GetWorldAttendanceReq = {};
export type GetWorldAttendanceRes = {};

export type DeleteCharacterReq = {};
export type DeleteCharacterRes = {};

export type CreateHashTagReq = {};
export type CreateHashTagRes = {};

export type SearchHashTagReq = {};
export type SearchHashTagRes = {};

export type GetTodayWordReq = {};
export type GetTodayWordRes = {};

export type CreateWordTodayReq = {};
export type CreateWordTodayRes = {};

export type GetWorldTodoProgressReq = {};
export type GetWorldTodoProgressRes = {};

export type GetRecommendedWorldTodosReq = {};
export type GetRecommendedWorldTodosRes = {};

export type GetAlarmRecommendedReq = {};
export type GetAlarmRecommendedRes = {};
