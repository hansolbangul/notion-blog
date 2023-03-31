import { Post } from "../domain/post";
import { Tags } from "../domain/tag";

export class TagService {
  getAllTag(posts: Post[]) {
    const tagPosts = posts.filter((post) => post?.tags);
    const tags = [...tagPosts.map((post) => post.tags).flat()];
    const tagObj: Tags = {};
    tags.forEach((tag) => {
      if (!tag) return;
      if (tag in tagObj) {
        tagObj[tag]++;
      } else {
        tagObj[tag] = 1;
      }
    });

    return tagObj;
  }
}
