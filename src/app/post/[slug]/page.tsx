import * as React from "react";
import "react-notion-x/src/styles.css";
import {Metadata} from "next";
import NotionPage from "@/src/components/Notion/NotionPage";
import {Suspense} from "react";
import {getPosts, getRecordMap} from "@/src/apis";
import {filterPosts} from "@/src/libs/utils/notion";
import {QueryClient, dehydrate, HydrationBoundary, useQuery} from '@tanstack/react-query';
import {queryKey} from "@/src/constants/queryKey";
import {TPost, TPosts} from "@/src/types";
import {ExtendedRecordMap} from "notion-types";

type Props = {
    params: {
        slug: string;
    };
};

type FetchType = {
    detailPosts: TPosts
    post: TPost;
    prev: string | null;
    next: string | null;
    recordMap: ExtendedRecordMap;
    thumbnail: string;
};

async function getFetch(slug: string): Promise<FetchType> {
    const posts = await getPosts();
    const detailPosts = filterPosts(posts);
    const postDetail = detailPosts.find((t: TPost) => t.slug === slug);
    if (!postDetail) throw new Error('Post not found');
    const recordMap = await getRecordMap(postDetail.id);

    const postId = detailPosts.findIndex((p: TPost) => p.slug === slug);
    const prev = postId === detailPosts.length - 1 ? null : detailPosts[postId + 1].slug;
    const next = postId === 0 ? null : detailPosts[postId - 1].slug;

    return {
        detailPosts: detailPosts,
        post: postDetail,
        prev,
        next,
        recordMap,
        thumbnail: postDetail.thumbnail || "",
    };
}

export async function generateMetadata({params: {slug}}: Props): Promise<Metadata> {
    const {post, thumbnail} = await getFetch(slug);
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
                    height: 630,
                },
            ],
        },
        keywords: post?.tags?.map((tag) => tag),
    };
}

export async function generateStaticParams() {
    const posts = await getPosts();
    const filteredPosts = filterPosts(posts);

    return filteredPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostDetail({params: {slug}}: Props): Promise<JSX.Element> {
    const queryClient = new QueryClient();
    const fetchData = await getFetch(slug);

    await queryClient.prefetchQuery({
        queryKey: queryKey.posts(),
        queryFn: () => fetchData.detailPosts,
    });

    await queryClient.prefetchQuery({
        queryKey: queryKey.post(slug),
        queryFn: () => ({...fetchData.post, recordMap: fetchData.recordMap}),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PostContent/>
        </HydrationBoundary>
    );
}

function PostContent(): JSX.Element {

    return (
        <>
            <div className="mt-4">
                <NotionPage/>
            </div>
        </>
    );
}
