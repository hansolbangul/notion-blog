import Link from "next/link";
import ServiceGallery from "@components/Services/ServiceGallery";
import { services } from "@libs/services";
import { createSeoMetadata } from "@libs/seo";

export const metadata = createSeoMetadata({
  title: "만든 서비스",
  description: "연당과 아우어 OUR, 직접 만들고 운영하는 서비스를 둘러보세요.",
  pathname: "/services",
});

export default function ServicesPage() {
  return (
    <div className="services-directory">
      <header className="services-directory-heading">
        <Link href="/" className="article-back">
          ← 블로그로
        </Link>
        <p className="eyebrow">BUILT BY ISTP.BUILDERS</p>
        <h1>
          만든 서비스<span>{String(services.length).padStart(2, "0")}</span>
        </h1>
        <p>
          직접 만들고, 계속 다듬고 있습니다.
          <br />
          마음에 드는 서비스를 만나보세요.
        </p>
      </header>
      <ServiceGallery services={services} />
      <div className="services-directory-end">
        <span>만들면서 배운 이야기도 남깁니다.</span>
        <Link href="/#archive">개발 기록 읽기 →</Link>
      </div>
    </div>
  );
}
