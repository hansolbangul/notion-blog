import Image from "next/image";
import type { ConnectedService } from "@libs/services";

export default function ServiceGallery({
  services,
}: {
  services: ConnectedService[];
}) {
  return (
    <div className="service-gallery">
      {services.map((service) => (
        <a
          className="service-project"
          key={service.id}
          href={service.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${service.name} — ${service.action} (새 탭)`}
        >
          <div className="service-preview">
            <Image
              src={service.preview}
              alt={service.previewAlt}
              width={1000}
              height={700}
              sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 46vw, 540px"
            />
            <span className="service-preview-open" aria-hidden="true">
              서비스 열기 ↗
            </span>
          </div>
          <div className="service-project-copy">
            <span className="service-category">{service.category}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className="service-project-action">
              <span>
                {service.action} <span aria-hidden="true">↗</span>
              </span>
              <small>새 탭에서 열기</small>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
