const CONFIG = {
  user: {
    name: "",
    age: "",
    profile: "",
  },
  metadata: {
    title: "우당탕탕 도서관",
    description: "",
  },
  blog: {
    title: "우당탕탕 도서관",
    description: "우리만의 책내음 가득한 공간~",
    todayWords: ["hello world", "udangtangtang", "V-log"],
    calendarTitle: "",
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