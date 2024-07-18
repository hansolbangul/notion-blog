import Container from "../components/Elements/Container";
import Home from "../components/Home/Home";
import Tag from "../components/Tag/Tag";
import { DEFAULT_CATEGORY } from "../constants";
import { getPosts } from "../libs/apis";
import { filterPosts, getAllSelectItemsFromPosts } from "../libs/utils/notion";
import { CONFIG } from "@/site.config";

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
    title: CONFIG.blog.title,
    description: CONFIG.metadata.description,
    openGraph: {
        title: CONFIG.blog.title,
        description: CONFIG.metadata.description,
        images: [
            {
                url: '/main_img.webp' || '',
                alt: '지한솔방울 썸넬',
                width: 1200,
                height: 630
            }
        ]
    }
};

export default async function Page() {
  const { tags, posts } = await getFetch();

  return (
    // <Container.Col className="md:flex-row">
    <Container.Col>
      {/* <Tag tags={tags} /> */}
      <Home posts={posts} />
    </Container.Col>
  );
}
