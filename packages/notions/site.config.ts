const CONFIG = {
  user: {
    name: "",
    age: "",
    profile: "",
  },
  url: "https://blog.hansolbangul.com",
  metadata: {
    title: "데굴데굴 블로그 | 프론트엔드 개발 아카이브",
    description:
      "프론트엔드 개발 기록과 실험, Notion 기반 아카이브를 정리하는 데굴데굴 블로그입니다. React, TypeScript, Next.js, CSS, 브라우저와 개발 생산성에 관한 글을 다룹니다.",
    keywords: [
      "프론트엔드 블로그",
      "프론트엔드 개발",
      "웹 개발",
      "React",
      "JavaScript",
      "Next.js",
      "TypeScript",
    ],
    openGraph: {
      title: "데굴데굴 블로그",
      description:
        "프론트엔드 개발 기록과 실험, Notion 기반 아카이브를 정리하는 공간입니다.",
      images: [
        {
          url: "https://blog.hansolbangul.com/main_img.webp",
          alt: "지한솔방울썸넬",
          width: 1200,
          height: 630,
        },
      ],
    },
  },
  blog: {
    title: "데굴데굴 블로그",
    todayWords: ["hello world", "hansolbangul", "V-log"],
    scheme: "dark",
  },
  utterances: {
    enable: true,
    config: {
      repo: "hansolbangul/Notion-blog",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
    viewId: process.env.V_ID,
  },
  isToolToggleVisible: true,
  sns: {
    github: "https://github.com/hansolbangul",
    linkedin: "https://www.linkedin.com/in/hansolbangul/",
  },
  headerButton: {
    mainProject: {
      name: "우당탕탕 도서관 가기",
      url: "https://blog.uddangtangtang.com/",
    },
    myInfo: {
      name: "제가 궁금하신가요?",
      url: "https://profile.hansolbangul.com/",
    },
  },
  searchManager: {
    google: "Q1Bav1At-K9niA9pM2HWt_E8s4d17CThq0EvCWS6RPk",
  },
  analytics: {
    google:
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2465657218123782",
  },
};

export default CONFIG;
