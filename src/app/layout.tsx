import "./globals.css";

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
      </head>
      <body>
        <div
          id="toast-root"
          className="fixed right-2/4 transform translate-x-2/4 flex flex-col z-30 w-64 space-y-2"
        />
        <div id="modal-root" className="fixed z-30" />
        <div className="p-8">{children}</div>
      </body>
    </html>
  );
}
