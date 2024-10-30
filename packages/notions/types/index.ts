import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ExtendedRecordMap } from "notion-types";

export type TPostStatus = "Private" | "Public" | "PublicOnDetail";
export type TPostType = "Post" | "Paper" | "Page" | "Project" | "Library";

export type TPost = {
  id: string;
  date: { start_date: string };
  type: TPostType[];
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
  status: TPostStatus[];
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

export type PostDetail = TPost & {
  recordMap: ExtendedRecordMap;
};

export type SchemeType = "light" | "dark";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
