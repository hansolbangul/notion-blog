"use client";

import RecommendComponent from "./RecommendComponent";
import { TPosts } from "@blog/notions/types";

type Props = {
  commendPosts: TPosts;
};

const RecommendSwiper = ({ commendPosts }: Props) => {
  const featuredPosts = commendPosts.slice(0, 3);

  if (!featuredPosts.length) return null;

  const [leadPost, ...secondaryPosts] = featuredPosts;

  return (
    <section className="mt-2 border-b border-line pb-12">
      <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
            recommended archive
          </p>
          <h2 className="font-display text-[32px] leading-[1.1] text-ink sm:text-[40px]">
            지금 다시 보면 좋은 글
          </h2>
        </div>
        <p className="text-body14 leading-7 text-ink-soft">
          그때는 지나쳤지만 다시 읽으면 좋은 실험과 기록을 모아뒀어요.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
        <RecommendComponent index={1} post={leadPost} variant="lead" />
        <div className="grid gap-4">
          {secondaryPosts.map((post, index) => (
            <RecommendComponent
              key={post.id}
              index={index + 2}
              post={post}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendSwiper;
