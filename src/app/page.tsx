import PostService from "@/application/services/postService";
import { CONFIG } from "../../site.config";
import { TagService } from "@/application/services/tagService";
import { Metadata } from "next";
import Tag from "@/components/Tag/Tag";
import Home from "@/components/Home/Home";
import Container from "@/components/Elements/Container";
import { getPosts } from "@/lib/apis";
import { filterPosts, getAllSelectItemsFromPosts } from "@/lib/utils/notion";

export const dynamic = "force-dynamic";
export const revalidate = 1;
type Props = {
  searchParams: {
    tag: string;
  };
};

// async function getFetch() {
//   const posts = await getPosts();
//   const filteredPost = filterPosts(posts);
//   const tags = getAllSelectItemsFromPosts("tags", filteredPost);
//   const categories = getAllSelectItemsFromPosts("category", filteredPost);

//   return {
//     posts: filteredPost,
//     tags: tags,
//   };
// }

async function getFetch(tag: string) {
  console.log(tag);

  const postService = new PostService();
  const tagService = new TagService();
  await postService.init();

  const posts = await postService.getFilterPosts({});
  const tags = tagService.getAllTag(posts);

  // filter tag
  const filterPost = posts.filter((post) => {
    if (tag === "All") return true;
    const postTag = post.tags;

    return postTag?.includes(tag);
  });

  return { posts: filterPost, tags };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { posts, tags } = await getFetch(searchParams.tag || "All");
  return {
    title: CONFIG.metadata.title || "V-BLOG",
    description: "",
    openGraph: {
      images: [
        {
          url: "",
          alt: "",
        },
      ],
    },
    keywords: Object.keys(tags).map((tag) => tag),
  };
}

export default async function Page({ searchParams }: Props) {
  const { posts, tags } = await getFetch(searchParams.tag || "All");
  // const { posts, tags } = await getFetch();

  return (
    <Container.Flex>
      <Tag tags={tags} />
      <Home posts={posts} />
    </Container.Flex>
  );
}
