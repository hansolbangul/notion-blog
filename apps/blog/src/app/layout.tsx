import "./globals.css";
import type { Metadata } from "next";
import NextQueryProvider from "@app/NextQueryProvider";
import BodyLayout from "@app/BodyLayout";
import CONFIG from "@/site.config";
import { createSiteMetadata } from "@libs/seo";

export const metadata: Metadata = createSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2465657218123782" />
        {CONFIG.analytics.google && (
          <script
            async
            src={CONFIG.analytics.google}
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body className="font-body text-ink antialiased">
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
