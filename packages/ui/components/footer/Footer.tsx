import CONFIG from "@blog/notions/site.config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid w-full max-w-[1260px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:px-8">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
            footer
          </p>
          <h2 className="font-display text-[22px] font-semibold text-ink">
            {CONFIG.blog.title}
          </h2>
          <p className="max-w-xl text-body14 leading-7 text-ink-soft">
            프론트엔드 개발 기록과 실험, 그리고 Notion 기반 아카이브를 정리하는
            공간입니다.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
              explore
            </p>
            <div className="flex flex-col gap-2 text-body14 text-ink">
              <a href="/">홈</a>
              <a href="/?tag=All">전체 글</a>
              <a href="/page/profile">프로필</a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-editorial text-ink-soft">
              elsewhere
            </p>
            <div className="flex flex-col gap-2 text-body14 text-ink">
              <a
                href={CONFIG.sns.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={CONFIG.sns.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
