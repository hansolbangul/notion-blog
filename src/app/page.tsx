import PostService from "@/application/services/postService";
import { CONFIG } from "../../site.config";
import { TagService } from "@/application/services/tagService";
import { Metadata } from "next";
import Tag from "@/components/Tag/Tag";
import Home from "@/components/Home/Home";
import Container from "@/components/Elements/Container";

async function getFetch() {
  const postService = new PostService();
  const tagService = new TagService();
  await postService.init();

  const posts = await postService.getFilterPosts({});
  const tags = tagService.getAllTag(posts);

  return { posts, tags };
}

export async function generateMetadata(): Promise<Metadata> {
  const { posts, tags } = await getFetch();
  return {
    title: CONFIG.metadata.title || "V-BLOG",
    description: CONFIG.blog.description,
    openGraph: {
      images: posts.map((post) => ({ url: post?.thumbnail || "", alt: post.title })),
    },
    keywords: Object.keys(tags).map((tag) => tag),
  };
}

export default async function Page() {
  const { posts, tags } = await getFetch();

  return (
    <Container.Col className="md:flex-row">
      <Tag tags={tags} />
      <Home posts={posts} />
    </Container.Col>
  );
}
