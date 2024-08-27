import Container from "../components/Elements/Container";
import { CONFIG } from "@/site.config";
import postQueryOptions from "@/src/service/postService";
import { getDehydratedQueries, Hydrate } from "@/src/app/reactQuery";
import { getCachedPosts } from "@/src/app/postsCache";
import Home from "@app/(component)/home/Home";

async function getFetch() {
  const posts = await getCachedPosts();
  const { queryKey } = postQueryOptions.all();

  return await getDehydratedQueries([
    {
      queryKey,
      queryFn: () => posts,
    },
  ]);
}

// export const metadata = {
//   title: CONFIG.blog.title,
//   description: CONFIG.metadata.description,
//   openGraph: {
//     title: CONFIG.blog.title,
//     description: CONFIG.metadata.description,
//     images: [
//       {
//         url: "/main_img.webp" || "",
//         alt: "지한솔방울 썸넬",
//         width: 1200,
//         height: 630,
//       },
//     ],
//   },
// };

export default async function Page() {
  const dehydratedState = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <Home />
      </Container.Col>
    </Hydrate>
  );
}
