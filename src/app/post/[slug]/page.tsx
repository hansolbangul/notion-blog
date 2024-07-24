import * as React from "react";
import "react-notion-x/src/styles.css";
import { Metadata } from "next";
import { getPostBlocks, getPosts } from "@/src/libs/apis";
import NotionPage from "@/src/components/Notion/NotionPage";
import { Suspense } from "react";

export const dynamic = 'force-static';
export const dynamicParams = true;
export const revalidate = 60; // 재검증 간격을 늘려서 서버 부하를 줄입니다

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
    if (!post) throw new Error('Post not found');

    const blockMap = await getPostBlocks(post.id);
    const postId = posts.findIndex((p) => p.slug === slug);

    const prev = postId === posts.length - 1 ? null : posts[postId + 1].slug;
    const next = postId === 0 ? null : posts[postId - 1].slug;

    return {
        post,
        prev,
        next,
        blockMap,
        thumbnail: post.thumbnail || "",
    };
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    const { post, thumbnail } = await getFetch(slug);
    return {
        title: post?.title,
        description: post?.summary || post?.title,
        openGraph: {
            title: post?.title,
            description: post?.summary || post?.title,
            images: [
                {
                    url: thumbnail,
                    alt: post?.title,
                    width: 1200,
                    height: 630
                },
            ],
        },
        keywords: post?.tags?.map((tag) => tag),
    };
}

export default async function PostDetail({ params: { slug } }: Props) {
    const { blockMap, post, next, prev } = await getFetch(slug);

    return (
        <>
            {blockMap && (
                <div className="mt-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotionPage blockMap={blockMap} post={post!} next={next} prev={prev} />
                    </Suspense>
                </div>
            )}
        </>
    );
}
