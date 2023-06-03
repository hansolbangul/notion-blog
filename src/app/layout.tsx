import "./globals.css";
import Header from "../components/Header/Header";
import { CONFIG } from "@/site.config";

export const metadata = {
  title: CONFIG.blog.title,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="toast-root" className="fixed right-2/4 transform translate-x-2/4 flex flex-col z-30 w-64 space-y-2" />
        <div id="modal-root" className="fixed z-30" />
        <Header />
        <div className="max-w-3xl mx-auto relative">{children}</div>
      </body>
    </html>
  );
}
