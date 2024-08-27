import Container from "../components/Elements/Container";
import { CONFIG } from "@/site.config";
import postQueryOptions from "@/src/service/postService";
import { getDehydratedQueries, Hydrate } from "@/src/app/reactQuery";
import { getCachedPosts } from "@/src/app/postsCache";
import Home from "@app/(component)/home/Home";
import { getAllSelectItemsFromPosts } from "@libs/utils/notion";

async function getFetch() {
  const posts = await getCachedPosts();
  const { queryKey } = postQueryOptions.all();

  return {
    dehydratedState: await getDehydratedQueries([
      {
        queryKey,
        queryFn: () => posts,
      },
    ]),
    tags: Object.keys(getAllSelectItemsFromPosts("tags", posts)),
  };
}

export default async function Page() {
  const { dehydratedState, tags } = await getFetch();

  return (
    <Hydrate state={dehydratedState}>
      <Container.Col>
        <Home tags={tags} />
      </Container.Col>
    </Hydrate>
  );
}
