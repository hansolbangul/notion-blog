import PostService from "@/application/services/postService";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const service = new PostService();
  await service.init();

  const posts = await service.getFilterPosts({});

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getFetch(slug: string) {
  const service = new PostService();
  await service.init();

  const posts = await service.getFilterPosts({ options: { status: ["Public"], type: "Paper" } });

  const post = posts.find((p) => p.slug === slug);
  const blockMap = await service.getPostBlock(post?.id!);

  return {
    post,
    blockMap,
  };
}

// export async function generateMetadata({params: {slug}}: Props): Promise<Metadata> {
//   const { post } = await getFetch(slug);
//     return {
//       title: post?.title,
//       description: post?.summary || post?.title,
//       openGraph: {
//         images: [
//           {
//             url: post?.thumbnail || '',
//             alt: post?.title,
//           },
//         ],
//       },
//       keywords: post?.tags?.map((tag) => tag),
//     }
// }

export default function PaperDetail({ params: { slug } }: Props) {
  return <div>PaperDetail</div>;
}
