import { TPosts, TPostStatus, TPostType } from "../../types";

export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[];
  acceptType?: TPostType[];
};

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
};
const current = new Date();
const tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const isNotionDebugEnabled = process.env.NODE_ENV !== "production";

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption,
): TPosts {
  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options;
  let invalidDataCount = 0;
  let invalidStatusCount = 0;
  let invalidTypeCount = 0;

  const filteredPosts = posts
    // filter data
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime);
      const isValid = !!post.title && !!post.slug && postDate <= tomorrow;
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
