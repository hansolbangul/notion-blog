import { NotionRenderer } from "react-notion-x";

import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";
import { Post } from "@/application/domain/post";
import React from "react";
import PostService from "@/application/services/postService";

type Props = {
  post: Post;
  blockMap: any;
};

async function getFetch(slug: string) {
  const service = new PostService();
  await service.init();

  const posts = await service.getFilterPosts({});

  const post = posts.find((p) => p.slug === slug);
  const blockMap = await service.getPostBlock(post?.id!);

  return {
    post,
    blockMap,
  };
}

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

export default function PostDetail() {
  return <div>zz</div>;
}

// export default function PostDetail() {
//   const category = (data.category && data.category?.[0]) || undefined;
//   return (
//     <div className={`m-auto max-w-4xl bg-white dark:bg-zinc-700 rounded-3xl py-12 px-6 shadow-md`}>
//       <article className=" m-auto max-w-2xl">
//         {/* {category && (
//           <Category
//             className="mb-2"
//             readOnly={data.status?.[0] === "PublicOnDetail"}
//           >
//             {category}
//           </Category>
//         )} */}
//         {/* {data.type[0] === "Post" && <PostHeader data={data} />} */}
//         {blockMap && (
//           <div className="-mt-4">
//             <NotionRenderer
//               recordMap={blockMap}
//               components={{
//                 Code,
//                 Collection,
//                 Equation,
//                 Modal,
//                 Pdf,
//               }}
//             />
//           </div>
//         )}
//         {/* {data.type[0] === "Post" && (
//           <>
//             <Footer />
//             <CommentBox data={data} />
//           </>
//         )} */}
//       </article>
//     </div>
//   );
// }
