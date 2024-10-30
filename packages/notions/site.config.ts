const CONFIG = {
  user: {
    name: "",
    age: "",
    profile: "",
  },
  metadata: {
    title: "데굴데굴 포스팅 | hansolbangul",
    description:
      "데굴데굴 블로그는 다양한 개발 로그와 프론트엔드 관련 정보를 공유하는 공간입니다. JavaScript, React, CSS 등 최신 웹 기술과 관련된 심도 있는 분석과 실습 가이드를 제공합니다. 프론트엔드 개발자로서의 여정과 경험을 담아내며, 유용한 팁과 트릭을 통해 개발자들의 성장을 도모합니다. 또한, 프로젝트 관리와 효율적인 협업 방법에 대한 인사이트도 다루고 있습니다. 많은 관심 부탁드립니다.",
    keywords: "블로그, 개발, 로고, 프론트엔드, 웹 개발, React, JavaScript",
    openGraph: {
      title: "데굴데굴 블로그",
      description:
        "데굴데굴 블로그는 다양한 개발 로고와 프론트엔드 관련 정보를 공유하는 공간입니다.",
      url: "https://blog.hansolbangul.com",
      type: "website",
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
    scheme: "dark", // 'light' | 'dark' | 'system'
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
  },
  isToolToggleVisible: true,
  sns: {
    github: "https://github.com/hansolbangul",
    linkedin:
      "https://www.linkedin.com/in/%ED%95%9C%EC%86%94-%EC%A7%80-832b18254/",
  },
  headerButton: {
    mainProject: {
      name: "우당탕탕 도서관 가기",
      url: "https://blog.uddangtangtang.com/",
    },
    myInfo: {
      name: "제가 궁금하신가요?",
      url: "/page/profile",
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
