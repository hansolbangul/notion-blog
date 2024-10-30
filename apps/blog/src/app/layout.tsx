import "./globals.css";
import NextQueryProvider from "@app/NextQueryProvider";
import BodyLayout from "@app/BodyLayout";
import CONFIG from "@blog/notions/site.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {CONFIG.searchManager.google && (
          <meta
            name="google-site-verification"
            content={CONFIG.searchManager.google}
          />
        )}
        {CONFIG.analytics.google && (
          <script
            async
            src={CONFIG.analytics.google}
            crossOrigin="anonymous"
          ></script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: CONFIG.metadata.title,
              url: CONFIG.url,
              description: CONFIG.metadata.description,
              publisher: {
                "@type": "Organization",
                name: CONFIG.metadata.title,
              },
              image: {
                "@type": "ImageObject",
                url: CONFIG.url + "/main_img.webp",
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
          <BodyLayout>{children}</BodyLayout>
        </NextQueryProvider>
      </body>
    </html>
  );
}
