"use client";
import NotionTemplate from "@app/(component)/notion/page/NotionTemplate";
import type { PostDetail } from "@blog/notions/types";
import Link from "next/link";
import ReadingRecommendation, {
  type RecommendedPost,
} from "./NotionItem/ReadingRecommendation";
type NavigationPost = { slug: string; title: string } | null;
export default function NotionPage({
  post,
  recommendations,
  prev,
  next,
}: {
  post: PostDetail;
  recommendations: RecommendedPost[];
  prev: NavigationPost;
  next: NavigationPost;
}) {
  return (
    <>
      <NotionTemplate post={post} />
      <ReadingRecommendation key={post.slug} posts={recommendations} />
      <nav className="article-next" aria-label="이전 다음 기록">
        {prev && (
          <Link href={`/post/${prev.slug}`}>
            <span>← 이전 기록</span>
            <strong>{prev.title}</strong>
          </Link>
        )}
        {next && (
          <Link href={`/post/${next.slug}`}>
            <span>다음 기록 →</span>
            <strong>{next.title}</strong>
          </Link>
        )}
      </nav>
    </>
  );
}
