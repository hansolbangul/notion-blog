import "./globals.css";
import NextQueryProvider from "@app/NextQueryProvider";
import BodyLayout from "@app/BodyLayout";
import CONFIG from "@blog/notions/site.config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: CONFIG.metadata.title,
  description: CONFIG.metadata.description,
  keywords: CONFIG.metadata.keywords,
  openGraph: {
    title: CONFIG.metadata.openGraph.title,
    description: CONFIG.metadata.openGraph.description,
    url: CONFIG.metadata.openGraph.url,
    type: "website",
    images: [
      {
        url: CONFIG.metadata.openGraph.images[0].url,
        alt: CONFIG.metadata.openGraph.images[0].alt,
        width: CONFIG.metadata.openGraph.images[0].width,
        height: CONFIG.metadata.openGraph.images[0].height,
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
