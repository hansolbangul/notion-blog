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
        <title>{CONFIG.metadata.title}</title>
        <meta name="description" content={CONFIG.metadata.description} />
        <meta name="keywords" content={CONFIG.metadata.keywords} />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={CONFIG.metadata.openGraph.title} />
        <meta
          property="og:description"
          content={CONFIG.metadata.openGraph.description}
        />
        <meta property="og:url" content={CONFIG.metadata.openGraph.url} />
        <meta property="og:type" content={CONFIG.metadata.openGraph.type} />
        <meta
          property="og:image"
          content={CONFIG.metadata.openGraph.images[0].url}
        />
        <meta
          property="og:image:alt"
          content={CONFIG.metadata.openGraph.images[0].alt}
        />
        <meta
          property="og:image:width"
          content={CONFIG.metadata.openGraph.images[0].width.toString()}
        />
        <meta
          property="og:image:height"
          content={CONFIG.metadata.openGraph.images[0].height.toString()}
        />

        {/* Google Site Verification */}
        {CONFIG.searchManager.google && (
          <meta
            name="google-site-verification"
            content={CONFIG.searchManager.google}
          />
        )}

        {/* Google Analytics */}
        {CONFIG.analytics.google && (
          <script
            async
            src={CONFIG.analytics.google}
            crossOrigin="anonymous"
          ></script>
        )}
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
