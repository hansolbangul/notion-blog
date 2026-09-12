import Link from "next/link";
import Character from "@blog/ui/components/brand/Character";
import { getFeaturedServices } from "@libs/services";
import ServiceGallery from "./ServiceGallery";

export default function FeaturedServices() {
  return (
    <section
      id="services"
      className="featured-services"
      aria-labelledby="services-title"
    >
      <div className="services-section-heading">
        <div className="services-introduction">
          <Character pose="side" />
          <div>
            <h2 id="services-title">만든 서비스</h2>
            <p>이런 것도 만들었어요.</p>
          </div>
        </div>
        <Link href="/services" className="all-services-link">
          전체 서비스 보기 <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ServiceGallery services={getFeaturedServices()} />
    </section>
  );
}
