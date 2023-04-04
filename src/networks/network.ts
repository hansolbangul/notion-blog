import { Block, BlockMap, ExtendedRecordMap, ID, CollectionPropertySchemaMap } from "notion-types";

export type PostStatus = "Private" | "Public";
export type PostType = "Post" | "Page";

export type TPost = {
  id: string;
  date: { start_date: string };
  type: PostType[];
  slug: string;
  tags?: string[];
  category?: string[];
  summary?: string;
  author?: {
    id: string;
    name: string;
    profile_photo?: string;
  }[];
  title: string;
  status: PostStatus[];
  createdTime: string;
  fullWidth: boolean;
  thumbnail?: string;
};

export type TPosts = TPost[];

export type TTags = {
  [tagName: string]: number;
};

export type TCategories = {
  [category: string]: number;
};

export type ThemeType = "dark" | "light";

export type NotionBlock = Block;

export type NotionBlockMap = BlockMap;

export type NotionExtendedRecordMap = ExtendedRecordMap;

export type NotionId = ID;

export type NotionCollectionPropertySchemaMap = CollectionPropertySchemaMap;
