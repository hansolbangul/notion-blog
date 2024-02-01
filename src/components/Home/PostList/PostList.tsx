"use client";

import useQuery from "@/src/hook/useQuery";
import { TPost, TPosts } from "@/src/types";
import ListComponent from "@components/Post/ListComponent";
import { escapeRegExp } from "@/src/libs/utils";

type Props = {
  search: string;
  posts: TPosts;
  tags: { [tag: string]: number };
};

export default function PostList({ search, posts, tags }: Props) {
  const params = useQuery();
  const selectedTag = params.get("tag");

  const filteredPostByTag = posts.filter((post) => {
    if (!selectedTag) {
      return true;
    }

    return post.tags?.includes(selectedTag);
  });

  const filterPostBySearchKeywords = (post: TPost) => {
    const { title, summary = "" } = post;

    const searchKeyword = new RegExp(escapeRegExp(search), "i");

    return searchKeyword.test(title) || searchKeyword.test(summary);
  };

  const searchedPosts = filteredPostByTag.filter(filterPostBySearchKeywords);

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {searchedPosts.map((post) => (
        <ListComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
