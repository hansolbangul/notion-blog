import Container from "../components/Elements/Container";
import Home from "../components/Home/Home";
import Tag from "../components/Tag/Tag";
import { DEFAULT_CATEGORY } from "../constants";
import { getPosts } from "../libs/apis";
import { filterPosts, getAllSelectItemsFromPosts } from "../libs/utils/notion";

async function getFetch() {
  try {
    const posts = await getPosts();
    const filteredPost = filterPosts(posts);
    const tags = getAllSelectItemsFromPosts("tags", filteredPost);
    const categories = getAllSelectItemsFromPosts("category", filteredPost);

    return {
      tags: {
        ...tags,
      },
      categories: {
        [DEFAULT_CATEGORY]: filteredPost.length,
        ...categories,
      },
      posts: filteredPost,
    };
  } catch (error) {
    throw error;
  }
}

export default async function Page() {
  const { tags, posts } = await getFetch();

  return (
    <Container.Col>
      <Home posts={posts} tags={tags} />
    </Container.Col>
  );
}
