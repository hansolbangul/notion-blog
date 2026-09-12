export type ConnectedService = {
  id: string;
  name: string;
  category: string;
  description: string;
  href: string;
  preview: string;
  previewAlt: string;
  action: string;
  featuredOrder?: number;
};

// Add services here. Only entries with a featuredOrder can appear on the homepage.
export const services: ConnectedService[] = [
  {
    id: "yeondang",
    name: "연당",
    category: "운세 · 궁합",
    description: "오늘의 운세부터 궁합까지, 나를 알아가는 시간.",
    href: "https://yeondang.hansolbangul.com",
    preview: "/services/yeondang.jpg",
    previewAlt: "연당의 오늘의 운세와 캐릭터가 보이는 실제 서비스 화면",
    action: "연당 둘러보기",
    featuredOrder: 1,
  },
  {
    id: "marry-me",
    name: "Marry Me",
    category: "모바일 청첩장 · 메리와",
    description: "우리의 사진과 이야기로 만드는 모바일 청첩장.",
    href: "https://marry.hansolbangul.com",
    preview: "/services/marry-me.jpg",
    previewAlt:
      "메리와의 이름과 예식 날짜로 청첩장을 시작하는 실제 서비스 화면",
    action: "청첩장 둘러보기",
    featuredOrder: 2,
  },
];

export const HOME_SERVICE_LIMIT = 2;
export function getFeaturedServices(catalog: ConnectedService[] = services) {
  return catalog
    .filter((service) => service.featuredOrder !== undefined)
    .sort((a, b) => a.featuredOrder! - b.featuredOrder!)
    .slice(0, HOME_SERVICE_LIMIT);
}
