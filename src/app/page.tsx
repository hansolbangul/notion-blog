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

export const metadata = {
  title: "우당탕탕 도서관",
  openGraph: {
    title: "우당탕탕 도서관",
    description: "FE 개발자의 지식이 담긴 도서관",
    images: [
      {
        url: "https://uddangtangtang-write.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
        alt: "https://uddangtangtang-write.vercel.app/_next/image?url=%2Flogo.png&w=128&q=75",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Page() {
  const { tags, posts } = await getFetch();

  return (
    <Container.Col>
      <Home posts={posts} tags={tags} />
    </Container.Col>
  );
}
