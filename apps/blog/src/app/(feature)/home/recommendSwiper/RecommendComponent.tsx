import Image from "next/image";
import Link from "next/link";
import { TPost } from "@blog/notions/types";

interface Props {
  index: number;
  post: TPost;
  variant: "lead" | "compact";
}

const RecommendComponent = ({ index, post, variant }: Props) => {
  const href = `/post/${post.slug}`;
  const tag = post.tags?.[0] || "Recommend";
  const summary =
    post.summary || "가볍게 훑어보기보다 천천히 읽어볼 만한 기록입니다.";
  const dateText = new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
  }).format(new Date(post.date.start_date));

  if (variant === "lead") {
    return (
      <Link
        href={href}
        className="group relative block min-h-[320px] overflow-hidden border border-line bg-[#20150f] shadow-editorial"
      >
        {post.thumbnail && (
          <Image
            className="object-cover transition duration-700 group-hover:scale-105"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            src={post.thumbnail}
            alt={post.title}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 z-10 flex h-full flex-col justify-between p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-editorial text-white/70">
                recommended post
              </span>
              <span className="inline-flex border border-white/20 px-3 py-1 text-body13 text-white/90">
                {tag}
              </span>
            </div>
            <span className="font-display text-[34px] leading-none text-white/40">
              {String(index).padStart(2, "0")}
            </span>
          </div>

          <div className="max-w-[540px] space-y-4">
            <h2 className="font-display text-[30px] leading-[1.08] text-white sm:text-[42px]">
              {post.title}
            </h2>
            <p className="max-w-[460px] text-body14 leading-7 text-white/76">
              {summary}
            </p>
            <span className="block text-[11px] uppercase tracking-editorial text-white/60">
              {dateText}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group grid min-h-[152px] grid-cols-[96px_minmax(0,1fr)] border border-line bg-paper-strong shadow-panel"
    >
      <div className="relative h-full min-h-[152px] bg-[#20150f]">
        {post.thumbnail ? (
          <Image
            className="object-cover"
            fill
            sizes="96px"
            src={post.thumbnail}
            alt={post.title}
          />
        ) : null}
      </div>
      <div className="flex flex-col justify-between gap-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[11px] uppercase tracking-editorial text-ink-soft">
            {tag}
          </span>
          <span className="font-display text-[24px] leading-none text-accent">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-[22px] leading-[1.15] text-ink">
            {post.title}
          </h3>
          <p className="text-body13 leading-6 text-ink-soft">{summary}</p>
        </div>
        <span className="text-[11px] uppercase tracking-editorial text-ink-soft">
          {dateText}
        </span>
      </div>
    </Link>
  );
};

export default RecommendComponent;
