import { TPosts, TPostStatus, TPostType } from "../../types";

export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[];
  acceptType?: TPostType[];
};

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
};
const isNotionDebugEnabled = process.env.NODE_ENV !== "production";

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption,
): TPosts {
  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options;
  const now = Date.now();
  let invalidDataCount = 0;
  let invalidStatusCount = 0;
  let invalidTypeCount = 0;

  const filteredPosts = posts
    // filter data
    .filter((post) => {
      const value = post?.date?.start_date || post.createdTime;
      // Date-only Notion publications start at midnight in the blog owner’s timezone.
      const postDate = new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00+09:00` : value,
      );
      const isValid = !!post.title && !!post.slug && postDate.getTime() <= now;
      if (!isValid) invalidDataCount += 1;
      return isValid;
    })
    // filter status
    .filter((post) => {
      const postStatus = post.status[0];
      const isAccepted = acceptStatus.includes(postStatus);
      if (!isAccepted) invalidStatusCount += 1;
      return isAccepted;
    })
    // filter type
    .filter((post) => {
      const postType = post.type[0];
      const isAccepted = acceptType.includes(postType);
      if (!isAccepted) invalidTypeCount += 1;
      return isAccepted;
    });

  if (isNotionDebugEnabled) {
    console.info("[notion:filterPosts] filter summary", {
      beforeCount: posts.length,
      afterCount: filteredPosts.length,
      invalidDataCount,
      invalidStatusCount,
      invalidTypeCount,
      acceptStatus,
      acceptType,
      sampleSlugs: filteredPosts
        .slice(0, 5)
        .map((post) => post.slug || "(missing)"),
    });
  }

  return filteredPosts;
}
