import * as React from "react";
import "react-notion-x/src/styles.css";
import {Metadata} from "next";
import {getPostBlocks, getPosts} from "@/src/libs/apis";
import NotionPage from "@/src/components/Notion/NotionPage";

export const dynamic = 'force-static';

export const dynamicParams = true;
export const revalidate = 1;

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

async function getFetch(slug: string) {
    const posts = await getPosts();
    const post = posts.find((t) => t.slug === slug);
    const blockMap = await getPostBlocks(post?.id!);
    const postId = posts.findIndex((p) => p.slug === slug);

    const prev = postId === posts.length - 1 ? null : posts[postId + 1].slug;
    const next = postId === 0 ? null : posts[postId - 1].slug;

    return {
        post: posts[postId],
        prev,
        next,
        blockMap,
    };
}

export async function generateMetadata({params: {slug}}: Props): Promise<Metadata> {
    const {post} = await getFetch(slug);
    return {
        title: post?.title,
        description: post?.summary || post?.title,
        openGraph: {
            title: post?.title,
            type: 'website',
            url: `https://uddangtangtang-write.vercel.app/post/${post?.slug}`,
            description: post?.summary || post?.title,
            images: [
                {
                    url: post?.thumbnail || "",
                    alt: post?.title,
                    width: 1200,
                    height: 630
                },
            ],
        },
        keywords: post?.tags?.map((tag) => tag),
    };
}

export default async function PostDetail({params: {slug}}: Props) {
    const {blockMap, post, next, prev} = await getFetch(slug);

    return (
        <>
            {blockMap && (
                <div className="mt-4">
                    <NotionPage blockMap={blockMap} post={post!} next={next} prev={prev}/>
                </div>
            )}
        </>
    );
}
