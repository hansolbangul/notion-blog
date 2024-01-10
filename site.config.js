const CONFIG = {
  user: {
    name: "",
    age: "",
    profile: "",
  },
  metadata: {
    title: "데굴데굴 포스팅 | hansolbangul",
    description: "개발 로그, 정보를 공유하는 것을 좋아해서 블로그를 작성하는 Frontend Developer 지한솔입니다.",
  },
  blog: {
    title: "데굴데굴 블로그",
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

module.exports = {CONFIG}