import "./globals.css";
import NextQueryProvider from "@app/NextQueryProvider";
import Header from "@blog/ui/components/header/Header";
import CrossView from "@blog/ui/components/layouts/CrossView";

export const metadata = {
  title: "데굴데굴 블로그",
  description:
    "데굴데굴 블로그는 다양한 개발 로고와 프론트엔드 관련 정보를 공유하는 공간입니다.",
  keywords: "블로그, 개발, 로고, 프론트엔드, 웹 개발, React, JavaScript",
  openGraph: {
    title: "데굴데굴 블로그",
    description:
      "데굴데굴 블로그는 다양한 개발 로고와 프론트엔드 관련 정보를 공유하는 공간입니다.",
    url: "https://blog.hansolbangul.com",
    type: "website",
    images: [
      {
        url: "/main_img.webp",
        alt: "지한솔방울 썸넬",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Q1Bav1At-K9niA9pM2HWt_E8s4d17CThq0EvCWS6RPk"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2465657218123782"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "데굴데굴 블로그", // 사이트 이름을 한글로 설정
              url: "https://blog.hansolbangul.com",
              description:
                "데굴데굴 블로그는 다양한 개발 로고와 프론트엔드 관련 정보를 공유하는 공간입니다.",
              publisher: {
                "@type": "Organization",
                name: "데굴데굴 블로그",
              },
              image: {
                "@type": "ImageObject",
                url: "/main_img.webp",
                width: 1200,
                height: 630,
              },
            }),
          }}
        />
      </head>
      <body>
        <div
          id="toast-root"
          className="fixed right-2/4 transform translate-x-2/4 flex flex-col z-30 w-64 space-y-2"
        />
        <div id="modal-root" className="fixed z-30" />
        <NextQueryProvider>
          <CrossView>{children}</CrossView>
        </NextQueryProvider>
      </body>
    </html>
  );
}
