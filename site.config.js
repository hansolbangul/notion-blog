const CONFIG = {
  user: {
    name: "",
    age: "",
    profile: "",
  },
  metadata: {
    title: "데굴데굴 포스팅 | hansolbangul",
    description: "",
  },
  blog: {
    title: "데굴데굴 블로그",
    description: "한솔방울의 돌아버린 프론트엔드 개발 블로그~",
    todayWords: ["hello world", "hansolbangul", "V-log"],
    calendarTitle: "이번달 채용 공고",
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
}

module.exports = { CONFIG }