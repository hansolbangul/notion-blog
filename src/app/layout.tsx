import "./globals.css";
import Header from "../components/Header/Header";
import ReactQueryProviders from "@hook/useReactQuery";

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
      </head>
      <body>
        <div
          id="toast-root"
          className="fixed right-2/4 transform translate-x-2/4 flex flex-col z-30 w-64 space-y-2"
        />
        <div id="modal-root" className="fixed z-30" />
        <Header />
        <div className="max-w-3xl mx-auto relative">
          <ReactQueryProviders>{children}</ReactQueryProviders>
        </div>
      </body>
    </html>
  );
}
